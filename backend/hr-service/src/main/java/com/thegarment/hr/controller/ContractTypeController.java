package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.dto.ContractTypeDto;
import com.thegarment.hr.dto.ContractTypeRequest;
import com.thegarment.hr.service.ContractTypeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/contract-types")
@RequiredArgsConstructor
@Tag(name = "Contract Type", description = "Contract type management")
public class ContractTypeController {

    private final ContractTypeService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ContractTypeDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.success(service.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContractTypeDto>> create(
            @Valid @RequestBody ContractTypeRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ContractTypeDto>> update(
            @PathVariable Long id, @Valid @RequestBody ContractTypeRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Updated", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
