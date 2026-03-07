package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.dto.NationalityDto;
import com.thegarment.hr.dto.NationalityRequest;
import com.thegarment.hr.service.NationalityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/nationalities")
@RequiredArgsConstructor
@Tag(name = "Nationality", description = "Nationality management")
public class NationalityController {

    private final NationalityService service;

    @GetMapping
    @Operation(summary = "Get all nationalities")
    public ResponseEntity<ApiResponse<List<NationalityDto>>> findAll(
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(service.findAll(search)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NationalityDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.findById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NationalityDto>> create(
            @Valid @RequestBody NationalityRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created successfully", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<NationalityDto>> update(
            @PathVariable Long id, @Valid @RequestBody NationalityRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Updated successfully", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted successfully", null));
    }
}
