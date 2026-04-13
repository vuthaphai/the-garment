package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.EmployeeEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface EmployeeRepository extends R2dbcRepository<EmployeeEntity, Long> {
    Mono<EmployeeEntity> findByEmpCardNo(String empCardNo);
    Mono<Boolean> existsByEmpCardNo(String empCardNo);
}
