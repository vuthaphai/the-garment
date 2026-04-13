package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.ShiftRequest;
import com.thegarment.adapter.dto.response.ShiftResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ShiftService {
    Flux<ShiftResponse> findAll();
    Mono<ShiftResponse> findById(Long id);
    Mono<ShiftResponse> create(ShiftRequest request);
    Mono<ShiftResponse> update(Long id, ShiftRequest request);
    Mono<Void> delete(Long id);
}
