package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.CompanySettingsRequest;
import com.thegarment.adapter.dto.response.CompanySettingsResponse;
import com.thegarment.adapter.service.CompanySettingsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/company-settings")
@RequiredArgsConstructor
public class CompanySettingsController {

    private final CompanySettingsService companySettingsService;

    @GetMapping
    public Mono<ResponseEntity<CompanySettingsResponse>> findFirst() {
        return companySettingsService.findFirst()
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.noContent().build());
    }

    @PutMapping
    public Mono<ResponseEntity<CompanySettingsResponse>> save(@Valid @RequestBody CompanySettingsRequest request) {
        return companySettingsService.save(request).map(ResponseEntity::ok);
    }
}
