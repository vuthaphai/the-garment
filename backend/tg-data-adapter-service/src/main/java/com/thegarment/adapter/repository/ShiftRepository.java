package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.ShiftEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface ShiftRepository extends R2dbcRepository<ShiftEntity, Long> {}
