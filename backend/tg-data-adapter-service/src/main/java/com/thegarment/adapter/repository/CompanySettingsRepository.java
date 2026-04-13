package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.CompanySettingsEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface CompanySettingsRepository extends R2dbcRepository<CompanySettingsEntity, Long> {}
