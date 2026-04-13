package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.response.CompanySettingsResponse;
import com.thegarment.adapter.dto.request.CompanySettingsRequest;
import reactor.core.publisher.Mono;

public interface CompanySettingsService {
    Mono<CompanySettingsResponse> findFirst();
    Mono<CompanySettingsResponse> save(CompanySettingsRequest request);
}
