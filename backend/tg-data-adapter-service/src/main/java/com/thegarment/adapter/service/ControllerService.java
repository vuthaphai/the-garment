package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.response.ControllerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ControllerService {
    Flux<ControllerResponse> findAll();
    Mono<ControllerResponse> findById(Long id);
}
