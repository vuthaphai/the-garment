package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.LeavePermissionRequest;
import com.thegarment.adapter.dto.response.LeavePermissionResponse;
import com.thegarment.adapter.service.LeavePermissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/leave-permissions")
@RequiredArgsConstructor
public class LeavePermissionController {

    private final LeavePermissionService leavePermissionService;

    @GetMapping("/page")
    public Mono<ResponseEntity<PageResponse<LeavePermissionResponse>>> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String empCardNo) {
        return leavePermissionService.findPage(page, size, empCardNo).map(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<LeavePermissionResponse>> findById(@PathVariable Long id) {
        return leavePermissionService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<LeavePermissionResponse>> create(@Valid @RequestBody LeavePermissionRequest request) {
        return leavePermissionService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<LeavePermissionResponse>> update(@PathVariable Long id,
            @Valid @RequestBody LeavePermissionRequest request) {
        return leavePermissionService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return leavePermissionService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
