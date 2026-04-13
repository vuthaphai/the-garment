package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.SeniorityBonusEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SeniorityBonusRepository extends R2dbcRepository<SeniorityBonusEntity, Long> {
    Flux<SeniorityBonusEntity> findByGroupPositionId(Long groupPositionId);
    Mono<Void> deleteByGroupPositionId(Long groupPositionId);
}
