package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.UserEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends R2dbcRepository<UserEntity, Long> {
    Mono<UserEntity> findByUsername(String username);
    Mono<Boolean> existsByUsername(String username);
}
