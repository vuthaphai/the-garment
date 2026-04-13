package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.GroupEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface GroupRepository extends R2dbcRepository<GroupEntity, Long> {}
