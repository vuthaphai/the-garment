package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.ContractTypeRequest;
import com.thegarment.adapter.dto.response.ContractTypeResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ContractTypeService {
    Flux<ContractTypeResponse> findAll();
    Mono<ContractTypeResponse> findById(Long id);
    Mono<ContractTypeResponse> create(ContractTypeRequest request);
    Mono<ContractTypeResponse> update(Long id, ContractTypeRequest request);
    Mono<Void> delete(Long id);
}
