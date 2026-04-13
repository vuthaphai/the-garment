package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.ContractTypeRequest;
import com.thegarment.adapter.dto.response.ContractTypeResponse;
import com.thegarment.adapter.entity.ContractTypeEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.ContractTypeRepository;
import com.thegarment.adapter.service.ContractTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContractTypeServiceImpl implements ContractTypeService {

    private final ContractTypeRepository contractTypeRepository;

    @Override
    public Flux<ContractTypeResponse> findAll() {
        return contractTypeRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<ContractTypeResponse> findById(Long id) {
        return contractTypeRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("ContractType", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<ContractTypeResponse> create(ContractTypeRequest request) {
        ContractTypeEntity entity = ContractTypeEntity.builder()
                .contractName(request.contractName())
                .autoRule(request.autoRule())
                .isAuto(request.isAuto())
                .duration(request.duration())
                .warning(request.warning())
                .createdAt(LocalDateTime.now())
                .build();
        return contractTypeRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<ContractTypeResponse> update(Long id, ContractTypeRequest request) {
        return contractTypeRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("ContractType", id)))
                .flatMap(e -> {
                    e.setContractName(request.contractName());
                    e.setAutoRule(request.autoRule());
                    e.setIsAuto(request.isAuto());
                    e.setDuration(request.duration());
                    e.setWarning(request.warning());
                    return contractTypeRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return contractTypeRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("ContractType", id)))
                .flatMap(contractTypeRepository::delete);
    }

    private ContractTypeResponse toResponse(ContractTypeEntity e) {
        return new ContractTypeResponse(
                e.getId(),
                e.getContractName(),
                e.getAutoRule(),
                e.getIsAuto(),
                e.getDuration(),
                e.getWarning(),
                e.getCreatedAt());
    }
}
