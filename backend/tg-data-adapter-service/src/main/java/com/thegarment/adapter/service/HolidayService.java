package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.HolidayRequest;
import com.thegarment.adapter.dto.response.HolidayResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface HolidayService {
    Flux<HolidayResponse> findAll();
    Flux<HolidayResponse> findByYear(Integer year);
    Mono<HolidayResponse> findById(Long id);
    Mono<HolidayResponse> create(HolidayRequest request);
    Mono<HolidayResponse> update(Long id, HolidayRequest request);
    Mono<Void> delete(Long id);
}
