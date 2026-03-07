package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.CompanySettings;
import com.thegarment.hr.service.CompanySettingsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings/company")
@RequiredArgsConstructor
@Tag(name = "Company Settings", description = "Company configuration")
public class CompanySettingsController {

    private final CompanySettingsService companySettingsService;

    @GetMapping
    public ResponseEntity<ApiResponse<CompanySettings>> get() {
        return ResponseEntity.ok(ApiResponse.success(companySettingsService.get()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<CompanySettings>> update(@RequestBody CompanySettings settings) {
        return ResponseEntity.ok(ApiResponse.success("Updated", companySettingsService.update(settings)));
    }
}
