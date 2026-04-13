package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.response.AttendanceDailyResponse;
import com.thegarment.adapter.entity.AttendanceDailyEntity;
import com.thegarment.adapter.repository.AttendanceDailyRepository;
import com.thegarment.adapter.service.AttendanceDailyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceDailyServiceImpl implements AttendanceDailyService {

    private final AttendanceDailyRepository attendanceDailyRepository;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;

    @Override
    public Mono<PageResponse<AttendanceDailyResponse>> findPage(int page, int size, String empCardNo) {
        Query baseQuery = empCardNo != null
                ? Query.query(Criteria.where("emp_card_no").is(empCardNo))
                : Query.empty();
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
