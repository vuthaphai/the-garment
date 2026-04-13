package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.GroupPositionRequest;
import com.thegarment.adapter.dto.response.GroupPositionResponse;
import com.thegarment.adapter.entity.GroupPositionEntity;
import com.thegarment.adapter.entity.GroupPositionLeaveIncreaseEntity;
import com.thegarment.adapter.entity.SeniorityBonusEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.GroupPositionLeaveIncreaseRepository;
import com.thegarment.adapter.repository.GroupPositionRepository;
import com.thegarment.adapter.repository.SeniorityBonusRepository;
import com.thegarment.adapter.service.GroupPositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupPositionServiceImpl implements GroupPositionService {

    private final GroupPositionRepository groupPositionRepository;
    private final GroupPositionLeaveIncreaseRepository leaveIncreaseRepository;
    private final SeniorityBonusRepository seniorityBonusRepository;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;

    @Override
    public Flux<GroupPositionResponse> findAll() {
        return groupPositionRepository.findAll(Sort.by("id"))
                .flatMap(this::enrich);
    }

    @Override
    public Mono<GroupPositionResponse> findById(Long id) {
        return groupPositionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("GroupPosition", id)))
                .flatMap(this::enrich);
    }

    @Override
    @Transactional
    public Mono<GroupPositionResponse> create(GroupPositionRequest request) {
        return groupPositionRepository.save(toEntity(request))
                .flatMap(saved -> saveRelated(saved, request).thenReturn(saved))
                .flatMap(this::enrich);
    }

    @Override
    @Transactional
    public Mono<GroupPositionResponse> update(Long id, GroupPositionRequest request) {
        return groupPositionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("GroupPosition", id)))
                .flatMap(entity -> {
                    updateEntity(entity, request);
                    return groupPositionRepository.save(entity);
                })
                .flatMap(saved -> leaveIncreaseRepository.deleteByGroupPositionId(saved.getId())
                        .then(seniorityBonusRepository.deleteByGroupPositionId(saved.getId()))
                        .then(saveRelated(saved, request))
                        .thenReturn(saved))
                .flatMap(this::enrich);
    }

    @Override
    @Transactional
    public Mono<Void> delete(Long id) {
        return groupPositionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("GroupPosition", id)))
                .flatMap(e -> leaveIncreaseRepository.deleteByGroupPositionId(id)
                        .then(seniorityBonusRepository.deleteByGroupPositionId(id))
                        .then(groupPositionRepository.delete(e)));
    }

    @Override
    public Mono<PageResponse<GroupPositionResponse>> findPage(int page, int size) {
        Mono<Long> countMono = r2dbcEntityTemplate.count(Query.empty(), GroupPositionEntity.class);
        Mono<List<GroupPositionResponse>> contentMono = r2dbcEntityTemplate
                .select(GroupPositionEntity.class)
                .matching(Query.empty().offset((long) page * size).limit(size))
                .all()
                .flatMap(this::enrich)
                .collectList();
        return Mono.zip(contentMono, countMono)
                .map(t -> PageResponse.of(t.getT1(), page, size, t.getT2()));
    }

    private Mono<Void> saveRelated(GroupPositionEntity gp, GroupPositionRequest request) {
        Mono<Void> saveLeaves = Mono.empty();
        if (request.leaveIncreases() != null && !request.leaveIncreases().isEmpty()) {
            List<GroupPositionLeaveIncreaseEntity> leaves = request.leaveIncreases().stream()
                    .map(li -> GroupPositionLeaveIncreaseEntity.builder()
                            .groupPositionId(gp.getId()).year(li.year()).days(li.days()).build())
                    .collect(Collectors.toCollection(ArrayList::new));
            saveLeaves = leaveIncreaseRepository.saveAll(leaves).then();
        }
        Mono<Void> saveBonuses = Mono.empty();
        if (request.seniorityBonuses() != null && !request.seniorityBonuses().isEmpty()) {
            List<SeniorityBonusEntity> bonuses = request.seniorityBonuses().stream()
                    .map(sb -> SeniorityBonusEntity.builder()
                            .groupPositionId(gp.getId()).year(sb.year()).amount(sb.amount()).percent(sb.percent()).build())
                    .collect(Collectors.toCollection(ArrayList::new));
            saveBonuses = seniorityBonusRepository.saveAll(bonuses).then();
        }
        return saveLeaves.then(saveBonuses);
    }

    private Mono<GroupPositionResponse> enrich(GroupPositionEntity e) {
        Mono<List<GroupPositionResponse.LeaveIncreaseItem>> leaves = leaveIncreaseRepository
                .findByGroupPositionId(e.getId())
                .map(li -> new GroupPositionResponse.LeaveIncreaseItem(li.getId(), li.getYear(), li.getDays()))
                .collectList();
        Mono<List<GroupPositionResponse.SeniorityBonusItem>> bonuses = seniorityBonusRepository
                .findByGroupPositionId(e.getId())
                .map(sb -> new GroupPositionResponse.SeniorityBonusItem(sb.getId(), sb.getYear(), sb.getAmount(), sb.getPercent()))
                .collectList();
        return Mono.zip(leaves, bonuses).map(t -> toResponse(e, t.getT1(), t.getT2()));
    }

    private GroupPositionEntity toEntity(GroupPositionRequest r) {
        return GroupPositionEntity.builder()
                .nativeName(r.nativeName()).foreignName(r.foreignName()).description(r.description())
                .ot1(r.ot1() != null ? r.ot1() : false).ot2(r.ot2() != null ? r.ot2() : false).ot3(r.ot3() != null ? r.ot3() : false)
                .payForOt1Food(r.payForOt1Food() != null ? r.payForOt1Food() : false)
                .payForOt2Food(r.payForOt2Food() != null ? r.payForOt2Food() : false)
                .payForOt3Food(r.payForOt3Food() != null ? r.payForOt3Food() : false)
                .payForSaturday(r.payForSaturday() != null ? r.payForSaturday() : false)
                .payForSunday(r.payForSunday() != null ? r.payForSunday() : false)
                .payForHoliday(r.payForHoliday() != null ? r.payForHoliday() : false)
                .shiftAllowance(r.shiftAllowance() != null ? r.shiftAllowance() : false)
                .neverAbsence(r.neverAbsence() != null ? r.neverAbsence() : false)
                .allowOtHalfHour(r.allowOtHalfHour() != null ? r.allowOtHalfHour() : false)
                .attendanceAllowance(r.attendanceAllowance())
                .goHomePercent(r.goHomePercent())
                .pregnantDayAllowed(r.pregnantDayAllowed() != null ? r.pregnantDayAllowed() : 0)
                .endContractPercent(r.endContractPercent())
                .pregnantRate(r.pregnantRate())
                .annualLeaveDayAllowed(r.annualLeaveDayAllowed() != null ? r.annualLeaveDayAllowed() : 0)
                .build();
    }

    private void updateEntity(GroupPositionEntity e, GroupPositionRequest r) {
        e.setNativeName(r.nativeName()); e.setForeignName(r.foreignName()); e.setDescription(r.description());
        if (r.ot1() != null) e.setOt1(r.ot1()); if (r.ot2() != null) e.setOt2(r.ot2()); if (r.ot3() != null) e.setOt3(r.ot3());
        if (r.payForOt1Food() != null) e.setPayForOt1Food(r.payForOt1Food());
        if (r.payForOt2Food() != null) e.setPayForOt2Food(r.payForOt2Food());
        if (r.payForOt3Food() != null) e.setPayForOt3Food(r.payForOt3Food());
        if (r.payForSaturday() != null) e.setPayForSaturday(r.payForSaturday());
        if (r.payForSunday() != null) e.setPayForSunday(r.payForSunday());
        if (r.payForHoliday() != null) e.setPayForHoliday(r.payForHoliday());
        if (r.shiftAllowance() != null) e.setShiftAllowance(r.shiftAllowance());
        if (r.neverAbsence() != null) e.setNeverAbsence(r.neverAbsence());
        if (r.allowOtHalfHour() != null) e.setAllowOtHalfHour(r.allowOtHalfHour());
        e.setAttendanceAllowance(r.attendanceAllowance()); e.setGoHomePercent(r.goHomePercent());
        if (r.pregnantDayAllowed() != null) e.setPregnantDayAllowed(r.pregnantDayAllowed());
        e.setEndContractPercent(r.endContractPercent()); e.setPregnantRate(r.pregnantRate());
        if (r.annualLeaveDayAllowed() != null) e.setAnnualLeaveDayAllowed(r.annualLeaveDayAllowed());
    }

    private GroupPositionResponse toResponse(GroupPositionEntity e,
            List<GroupPositionResponse.LeaveIncreaseItem> leaves,
            List<GroupPositionResponse.SeniorityBonusItem> bonuses) {
        return new GroupPositionResponse(
                e.getId(), e.getNativeName(), e.getForeignName(), e.getDescription(),
                e.getOt1(), e.getOt2(), e.getOt3(),
                e.getPayForOt1Food(), e.getPayForOt2Food(), e.getPayForOt3Food(),
                e.getPayForSaturday(), e.getPayForSunday(), e.getPayForHoliday(),
                e.getShiftAllowance(), e.getNeverAbsence(), e.getAllowOtHalfHour(),
                e.getAttendanceAllowance(), e.getGoHomePercent(), e.getPregnantDayAllowed(),
                e.getEndContractPercent(), e.getPregnantRate(), e.getAnnualLeaveDayAllowed(),
                e.getCreatedAt(), e.getUpdatedAt(), leaves, bonuses
        );
    }
}
