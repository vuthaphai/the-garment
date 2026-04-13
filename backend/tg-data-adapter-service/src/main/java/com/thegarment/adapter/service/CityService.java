package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.CityRequest;
import com.thegarment.adapter.dto.response.CityResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CityService {
    Flux<CityResponse> findAll();
    Mono<CityResponse> findById(Long id);
    Mono<CityResponse> create(CityRequest request);
    Mono<CityResponse> update(Long id, CityRequest request);
    Mono<Void> delete(Long id);
}
