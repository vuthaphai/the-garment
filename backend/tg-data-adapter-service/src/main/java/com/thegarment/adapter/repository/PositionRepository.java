package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.PositionEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface PositionRepository extends R2dbcRepository<PositionEntity, Long> {}
