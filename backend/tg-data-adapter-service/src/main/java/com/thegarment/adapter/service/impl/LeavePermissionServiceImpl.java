package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.LeavePermissionRequest;
import com.thegarment.adapter.dto.response.LeavePermissionResponse;
import com.thegarment.adapter.entity.LeavePermissionEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.LeavePermissionRepository;
import com.thegarment.adapter.service.LeavePermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeavePermissionServiceImpl implements LeavePermissionService {

    private final LeavePermissionRepository leavePermissionRepository;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;

    @Override
    public Mono<PageResponse<LeavePermissionResponse>> findPage(int page, int size, String empCardNo) {
        Query baseQuery = empCardNo != null
                ? Query.query(Criteria.where("emp_card_no").is(empCardNo))
                : Query.empty();
        Mono<Long> countMono = r2dbcEntityTemplate.count(baseQuery, LeavePermissionEntity.class);
        Mono<List<LeavePermissionResponse>> contentMono = r2dbcEntityTemplate
                .select(LeavePermissionEntity.class)
                .matching(baseQuery.offset((long) page * size).limit(size))
                .all()
                .map(this::toResponse)
                .collectList();
        return Mono.zip(contentMono, countMono)
                .map(t -> PageResponse.of(t.getT1(), page, size, t.getT2()));
    }

    @Override
    public Mono<LeavePermissionResponse> findById(Long id) {
        return leavePermissionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("LeavePermission", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<LeavePermissionResponse> create(LeavePermissionRequest request) {
        LeavePermissionEntity entity = LeavePermissionEntity.builder()
                .empCardNo(request.empCardNo())
                .permissionType(request.permissionType())
                .fromDate(request.fromDate())
                .toDate(request.toDate())
                .description(request.description())
                .leaveHours(request.leaveHours())
                .build();
        return leavePermissionRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<LeavePermissionResponse> update(Long id, LeavePermissionRequest request) {
        return leavePermissionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("LeavePermission", id)))
                .flatMap(e -> {
                    e.setEmpCardNo(request.empCardNo());
                    e.setPermissionType(request.permissionType());
                    e.setFromDate(request.fromDate());
                    e.setToDate(request.toDate());
                    e.setDescription(request.description());
                    e.setLeaveHours(request.leaveHours());
                    return leavePermissionRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return leavePermissionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("LeavePermission", id)))
                .flatMap(leavePermissionRepository::delete);
    }

    private LeavePermissionResponse toResponse(LeavePermissionEntity e) {
    return new LeavePermissionResponse(e.getId(), e.getEmpCardNo(), e.getPermissionType(),
        e.getFromDate(), e.getToDate(), e.getDescription(), e.getLeaveHours(),
                e.getCreatedAt(), e.getUpdatedAt());
    }
}
