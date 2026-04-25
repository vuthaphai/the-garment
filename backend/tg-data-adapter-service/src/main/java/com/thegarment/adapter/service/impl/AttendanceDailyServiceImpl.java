package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.AttendanceDailyRequest;
import com.thegarment.adapter.dto.response.AttendanceDailyResponse;
import com.thegarment.adapter.entity.AttendanceDailyEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.AttendanceDailyRepository;
import com.thegarment.adapter.service.AttendanceDailyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceDailyServiceImpl implements AttendanceDailyService {

    private final AttendanceDailyRepository attendanceDailyRepository;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;

    @Override
    public Mono<PageResponse<AttendanceDailyResponse>> findPage(int page, int size, String empCardNo,
            LocalDate dateFrom, LocalDate dateTo) {
        Query baseQuery = Query.empty();
        Criteria criteria = null;

        if (StringUtils.hasText(empCardNo)) {
            criteria = Criteria.where("emp_card_no").is(empCardNo.trim());
        }
        if (dateFrom != null) {
            Criteria fromCriteria = Criteria.where("scan_date").greaterThanOrEquals(dateFrom);
            criteria = criteria == null ? fromCriteria : criteria.and(fromCriteria);
        }
        if (dateTo != null) {
            Criteria toCriteria = Criteria.where("scan_date").lessThanOrEquals(dateTo);
            criteria = criteria == null ? toCriteria : criteria.and(toCriteria);
        }
        if (criteria != null) {
            baseQuery = Query.query(criteria);
        }

        Mono<Long> countMono = r2dbcEntityTemplate.count(baseQuery, AttendanceDailyEntity.class);
        Mono<List<AttendanceDailyResponse>> contentMono = r2dbcEntityTemplate
                .select(AttendanceDailyEntity.class)
                .matching(baseQuery.offset((long) page * size).limit(size))
                .all()
                .map(this::toResponse)
                .collectList();
        return Mono.zip(contentMono, countMono)
                .map(t -> PageResponse.of(t.getT1(), page, size, t.getT2()));
    }

    @Override
    public Mono<AttendanceDailyResponse> create(AttendanceDailyRequest request) {
        AttendanceDailyEntity entity = toEntity(request);
        return attendanceDailyRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<AttendanceDailyResponse> update(Long id, AttendanceDailyRequest request) {
        return attendanceDailyRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("AttendanceDaily", id)))
                .flatMap(existing -> {
                    updateEntity(existing, request);
                    return attendanceDailyRepository.save(existing);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return attendanceDailyRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("AttendanceDaily", id)))
                .flatMap(existing -> attendanceDailyRepository.deleteById(existing.getId()));
    }

    @Override
    public Mono<String> downloadFromFingerPrinter() {
        return Mono.just("Attendance download has been triggered");
    }

    private AttendanceDailyEntity toEntity(AttendanceDailyRequest request) {
        return AttendanceDailyEntity.builder()
                .empCardNo(request.empCardNo())
                .scanDate(request.scanDate())
                .t1(request.t1())
                .t2(request.t2())
                .t3(request.t3())
                .t4(request.t4())
                .t5(request.t5())
                .t6(request.t6())
                .t7(request.t7())
                .t8(request.t8())
                .workingHours(defaultNumber(request.workingHours()))
                .workDayType(request.workDayType())
                .leaveHours(defaultNumber(request.leaveHours()))
                .leaveType(request.leaveType())
                .ot1(defaultNumber(request.ot1()))
                .ot2(defaultNumber(request.ot2()))
                .ot3(defaultNumber(request.ot3()))
                .build();
    }

    private void updateEntity(AttendanceDailyEntity entity, AttendanceDailyRequest request) {
        entity.setEmpCardNo(request.empCardNo());
        entity.setScanDate(request.scanDate());
        entity.setT1(request.t1());
        entity.setT2(request.t2());
        entity.setT3(request.t3());
        entity.setT4(request.t4());
        entity.setT5(request.t5());
        entity.setT6(request.t6());
        entity.setT7(request.t7());
        entity.setT8(request.t8());
        entity.setWorkingHours(defaultNumber(request.workingHours()));
        entity.setWorkDayType(request.workDayType());
        entity.setLeaveHours(defaultNumber(request.leaveHours()));
        entity.setLeaveType(request.leaveType());
        entity.setOt1(defaultNumber(request.ot1()));
        entity.setOt2(defaultNumber(request.ot2()));
        entity.setOt3(defaultNumber(request.ot3()));
    }

    private BigDecimal defaultNumber(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }

    private AttendanceDailyResponse toResponse(AttendanceDailyEntity e) {
        return new AttendanceDailyResponse(
                                e.getId(), e.getEmpCardNo(), e.getScanDate(),
                                e.getT1(), e.getT2(), e.getT3(), e.getT4(),
                                e.getT5(), e.getT6(), e.getT7(), e.getT8(),
                                e.getWorkingHours(), e.getWorkDayType(), e.getLeaveHours(), e.getLeaveType(),
                                e.getOt1(), e.getOt2(), e.getOt3(),
                                e.getCreatedAt()
        );
    }
}
