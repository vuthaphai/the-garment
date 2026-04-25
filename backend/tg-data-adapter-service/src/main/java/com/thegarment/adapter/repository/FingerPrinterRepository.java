package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.FingerPrinterEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface FingerPrinterRepository extends R2dbcRepository<FingerPrinterEntity, Long> {}