package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.PositionRequest;
import com.thegarment.adapter.dto.response.PositionResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PositionService {
    Flux<PositionResponse> findAll();
    Mono<PositionResponse> findById(Long id);
    Mono<PositionResponse> create(PositionRequest request);
    Mono<PositionResponse> update(Long id, PositionRequest request);
    Mono<Void> delete(Long id);
}
