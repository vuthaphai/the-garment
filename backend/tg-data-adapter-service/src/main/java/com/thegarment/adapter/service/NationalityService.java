package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.NationalityRequest;
import com.thegarment.adapter.dto.response.NationalityResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface NationalityService {
    Flux<NationalityResponse> findAll();
    Mono<NationalityResponse> findById(Long id);
    Mono<NationalityResponse> create(NationalityRequest request);
    Mono<NationalityResponse> update(Long id, NationalityRequest request);
    Mono<Void> delete(Long id);
    Mono<PageResponse<NationalityResponse>> findPage(int page, int size);
}
