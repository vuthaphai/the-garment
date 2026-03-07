package com.thegarment.hr.service;

import com.thegarment.hr.dto.GroupPositionDto;
import com.thegarment.hr.dto.GroupPositionRequest;
import com.thegarment.hr.entity.GroupPosition;
import com.thegarment.hr.entity.GroupPositionLeaveIncrease;
import com.thegarment.hr.entity.SeniorityBonus;
import com.thegarment.hr.repository.GroupPositionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GroupPositionService {

    private final GroupPositionRepository repository;

    public List<GroupPositionDto> findAll() {
        return repository.findAllWithDetails().stream().map(this::toDto).collect(Collectors.toList());
    }

    public GroupPositionDto findById(Long id) {
        return toDto(repository.findByIdWithDetails(id)
                .orElseThrow(() -> new EntityNotFoundException("Group position not found: " + id)));
    }

    @Transactional
    public GroupPositionDto create(GroupPositionRequest request) {
        GroupPosition entity = buildEntity(new GroupPosition(), request);
        applyChildEntities(entity, request);
        return toDto(repository.save(entity));
    }

    @Transactional
    public GroupPositionDto update(Long id, GroupPositionRequest request) {
        GroupPosition entity = repository.findByIdWithDetails(id)
                .orElseThrow(() -> new EntityNotFoundException("Group position not found: " + id));
        buildEntity(entity, request);
        entity.getLeaveIncreases().clear();
        entity.getSeniorityBonuses().clear();
        applyChildEntities(entity, request);
        return toDto(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new EntityNotFoundException("Group position not found: " + id);
        repository.deleteById(id);
    }

    private GroupPosition buildEntity(GroupPosition entity, GroupPositionRequest r) {
        entity.setNativeName(r.getNativeName());
        entity.setForeignName(r.getForeignName());
        entity.setDescription(r.getDescription());
        entity.setOt1(r.getOt1()); entity.setOt2(r.getOt2()); entity.setOt3(r.getOt3());
        entity.setPayForOt1Food(r.getPayForOt1Food()); entity.setPayForOt2Food(r.getPayForOt2Food());
        entity.setPayForOt3Food(r.getPayForOt3Food()); entity.setPayForSaturday(r.getPayForSaturday());
        entity.setPayForSunday(r.getPayForSunday()); entity.setPayForHoliday(r.getPayForHoliday());
        entity.setShiftAllowance(r.getShiftAllowance()); entity.setNeverAbsence(r.getNeverAbsence());
        entity.setAllowOtHalfHour(r.getAllowOtHalfHour());
        entity.setAttendanceAllowance(r.getAttendanceAllowance());
        entity.setGoHomePercent(r.getGoHomePercent());
        entity.setPregnantDayAllowed(r.getPregnantDayAllowed());
        entity.setEndContractPercent(r.getEndContractPercent());
        entity.setPregnantRate(r.getPregnantRate());
        entity.setAnnualLeaveDayAllowed(r.getAnnualLeaveDayAllowed());
        return entity;
    }

    private void applyChildEntities(GroupPosition entity, GroupPositionRequest r) {
        if (r.getLeaveIncreases() != null) {
            r.getLeaveIncreases().forEach(li -> entity.getLeaveIncreases().add(
                    GroupPositionLeaveIncrease.builder()
                            .groupPosition(entity).year(li.getYear()).days(li.getDays()).build()));
        }
        if (r.getSeniorityBonuses() != null) {
            r.getSeniorityBonuses().forEach(sb -> entity.getSeniorityBonuses().add(
                    SeniorityBonus.builder()
                            .groupPosition(entity).year(sb.getYear())
                            .amount(sb.getAmount()).percent(sb.getPercent()).build()));
        }
    }

    private GroupPositionDto toDto(GroupPosition e) {
        List<GroupPositionDto.LeaveIncreaseDto> leaves = e.getLeaveIncreases() == null
                ? new ArrayList<>()
                : e.getLeaveIncreases().stream()
                .map(li -> GroupPositionDto.LeaveIncreaseDto.builder()
                        .id(li.getId()).year(li.getYear()).days(li.getDays()).build())
                .collect(Collectors.toList());

        List<GroupPositionDto.SeniorityBonusDto> bonuses = e.getSeniorityBonuses() == null
                ? new ArrayList<>()
                : e.getSeniorityBonuses().stream()
                .map(sb -> GroupPositionDto.SeniorityBonusDto.builder()
                        .id(sb.getId()).year(sb.getYear())
                        .amount(sb.getAmount()).percent(sb.getPercent()).build())
                .collect(Collectors.toList());

        return GroupPositionDto.builder()
                .id(e.getId()).nativeName(e.getNativeName()).foreignName(e.getForeignName())
                .description(e.getDescription()).ot1(e.getOt1()).ot2(e.getOt2()).ot3(e.getOt3())
                .payForOt1Food(e.getPayForOt1Food()).payForOt2Food(e.getPayForOt2Food()).payForOt3Food(e.getPayForOt3Food())
                .payForSaturday(e.getPayForSaturday()).payForSunday(e.getPayForSunday()).payForHoliday(e.getPayForHoliday())
                .shiftAllowance(e.getShiftAllowance()).neverAbsence(e.getNeverAbsence()).allowOtHalfHour(e.getAllowOtHalfHour())
                .attendanceAllowance(e.getAttendanceAllowance()).goHomePercent(e.getGoHomePercent())
                .pregnantDayAllowed(e.getPregnantDayAllowed()).endContractPercent(e.getEndContractPercent())
                .pregnantRate(e.getPregnantRate()).annualLeaveDayAllowed(e.getAnnualLeaveDayAllowed())
                .leaveIncreases(leaves).seniorityBonuses(bonuses)
                .build();
    }
}
