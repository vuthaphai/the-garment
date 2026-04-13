package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.NationalityEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface NationalityRepository extends R2dbcRepository<NationalityEntity, Long> {
    Flux<NationalityEntity> findByNativeNameContainingIgnoreCase(String nativeName);
}
