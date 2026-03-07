package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.dto.GroupPositionDto;
import com.thegarment.hr.dto.GroupPositionRequest;
import com.thegarment.hr.service.GroupPositionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/group-positions")
@RequiredArgsConstructor
@Tag(name = "Group Position", description = "Group position management with payment rules")
public class GroupPositionController {

    private final GroupPositionService service;

    @GetMapping
    public ResponseEntity<ApiResponse<List<GroupPositionDto>>> findAll() {
        return ResponseEntity.ok(ApiResponse.success(service.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GroupPositionDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(service.findById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<GroupPositionDto>> create(
            @Valid @RequestBody GroupPositionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", service.create(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GroupPositionDto>> update(
            @PathVariable Long id, @Valid @RequestBody GroupPositionRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Updated", service.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
