package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.CityEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface CityRepository extends R2dbcRepository<CityEntity, Long> {}
