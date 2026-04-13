package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.GroupPositionRequest;
import com.thegarment.adapter.dto.response.GroupPositionResponse;
import com.thegarment.adapter.service.GroupPositionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/group-positions")
@RequiredArgsConstructor
public class GroupPositionController {

    private final GroupPositionService groupPositionService;

    @GetMapping
    public Flux<GroupPositionResponse> findAll() {
        return groupPositionService.findAll();
    }

    @GetMapping("/page")
    public Mono<ResponseEntity<PageResponse<GroupPositionResponse>>> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return groupPositionService.findPage(page, size).map(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<GroupPositionResponse>> findById(@PathVariable Long id) {
        return groupPositionService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<GroupPositionResponse>> create(@Valid @RequestBody GroupPositionRequest request) {
        return groupPositionService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<GroupPositionResponse>> update(@PathVariable Long id,
            @Valid @RequestBody GroupPositionRequest request) {
        return groupPositionService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return groupPositionService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
