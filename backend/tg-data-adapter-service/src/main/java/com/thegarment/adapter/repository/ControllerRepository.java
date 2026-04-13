package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.ControllerEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface ControllerRepository extends R2dbcRepository<ControllerEntity, Long> {}
