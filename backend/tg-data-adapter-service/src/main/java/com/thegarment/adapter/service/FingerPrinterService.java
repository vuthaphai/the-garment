package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.FingerPrinterRequest;
import com.thegarment.adapter.dto.response.FingerPrinterResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface FingerPrinterService {
    Flux<FingerPrinterResponse> findAll();
    Mono<FingerPrinterResponse> findById(Long id);
    Mono<FingerPrinterResponse> create(FingerPrinterRequest request);
    Mono<FingerPrinterResponse> update(Long id, FingerPrinterRequest request);
    Mono<Void> delete(Long id);
}