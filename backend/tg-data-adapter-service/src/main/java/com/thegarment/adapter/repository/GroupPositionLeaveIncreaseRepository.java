package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.GroupPositionLeaveIncreaseEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupPositionLeaveIncreaseRepository extends R2dbcRepository<GroupPositionLeaveIncreaseEntity, Long> {
    Flux<GroupPositionLeaveIncreaseEntity> findByGroupPositionId(Long groupPositionId);
    Mono<Void> deleteByGroupPositionId(Long groupPositionId);
}
