package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.CompanySettings;
import com.thegarment.hr.repository.CompanySettingsRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings/company")
@RequiredArgsConstructor
@Tag(name = "Company Settings", description = "Company configuration")
public class CompanySettingsController {

    private final CompanySettingsRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<CompanySettings>> get() {
        CompanySettings settings = repository.findAll().stream().findFirst()
                .orElseGet(() -> repository.save(new CompanySettings()));
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<CompanySettings>> update(@RequestBody CompanySettings settings) {
        CompanySettings existing = repository.findAll().stream().findFirst()
                .orElse(new CompanySettings());
        settings.setId(existing.getId());
        return ResponseEntity.ok(ApiResponse.success("Updated", repository.save(settings)));
    }
}
