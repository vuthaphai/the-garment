package com.thegarment.hr.repository;

import com.thegarment.hr.entity.ContractType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractTypeRepository extends JpaRepository<ContractType, Long> {
    List<ContractType> findAllByOrderByContractName();
}
