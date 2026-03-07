package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.dto.PositionDto;
import com.thegarment.hr.dto.PositionRequest;
import com.thegarment.hr.service.PositionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/positions")
@RequiredArgsConstructor
@Tag(name = "Position", description = "Position management")
public class PositionController {

    private final PositionService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PositionDto>>> findAll(
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(service.findAll(search)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PositionDto>> create(
            @Valid @RequestBody PositionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PositionDto>> update(
            @PathVariable Long id, @Valid @RequestBody PositionRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Updated", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
