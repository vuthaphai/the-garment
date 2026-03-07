package com.thegarment.hr.service;

import com.thegarment.hr.dto.ContractTypeDto;
import com.thegarment.hr.dto.ContractTypeRequest;
import com.thegarment.hr.entity.ContractType;
import com.thegarment.hr.repository.ContractTypeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ContractTypeService {

    private final ContractTypeRepository repository;

    public List<ContractTypeDto> findAll() {
        return repository.findAllByOrderByContractName().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public ContractTypeDto create(ContractTypeRequest request) {
        ContractType entity = ContractType.builder()
                .contractName(request.getContractName())
                .autoRule(request.getAutoRule())
                .isAuto(request.getIsAuto())
                .duration(request.getDuration())
                .warning(request.getWarning())
                .build();
        return toDto(repository.save(entity));
    }

    @Transactional
    public ContractTypeDto update(Long id, ContractTypeRequest request) {
        ContractType entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contract type not found: " + id));
        entity.setContractName(request.getContractName());
        entity.setAutoRule(request.getAutoRule());
        entity.setIsAuto(request.getIsAuto());
        entity.setDuration(request.getDuration());
        entity.setWarning(request.getWarning());
        return toDto(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new EntityNotFoundException("Contract type not found: " + id);
        repository.deleteById(id);
    }

    private ContractTypeDto toDto(ContractType e) {
        return ContractTypeDto.builder()
                .id(e.getId()).contractName(e.getContractName())
                .autoRule(e.getAutoRule()).isAuto(e.getIsAuto())
                .duration(e.getDuration()).warning(e.getWarning())
                .build();
    }
}
