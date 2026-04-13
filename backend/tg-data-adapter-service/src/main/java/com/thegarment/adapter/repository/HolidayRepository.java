package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.HolidayEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import reactor.core.publisher.Flux;

public interface HolidayRepository extends R2dbcRepository<HolidayEntity, Long> {
    Flux<HolidayEntity> findByYear(Integer year);
}
