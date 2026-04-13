package com.thegarment.adapter.repository;

import com.thegarment.adapter.entity.ContractTypeEntity;
import org.springframework.data.r2dbc.repository.R2dbcRepository;

public interface ContractTypeRepository extends R2dbcRepository<ContractTypeEntity, Long> {}
