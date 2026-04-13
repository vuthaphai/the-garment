package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.AttendanceDailyEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface AttendanceDailyRepository extends R2dbcRepository<AttendanceDailyEntity, Long> {}
