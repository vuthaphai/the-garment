package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.GroupPositionEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface GroupPositionRepository extends R2dbcRepository<GroupPositionEntity, Long> {}
