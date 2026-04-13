package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.EmployeeContractEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface EmployeeContractRepository extends R2dbcRepository<EmployeeContractEntity, Long> {
    Flux<EmployeeContractEntity> findByEmployeeId(Long employeeId);
    Mono<Void> deleteByEmployeeId(Long employeeId);
}
