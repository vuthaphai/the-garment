package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.LeavePermissionEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface LeavePermissionRepository extends R2dbcRepository<LeavePermissionEntity, Long> {
    Flux<LeavePermissionEntity> findByEmpCardNo(String empCardNo);
}
