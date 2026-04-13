package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.PositionRequest;
import com.thegarment.adapter.dto.response.PositionResponse;
import com.thegarment.adapter.service.PositionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/positions")
@RequiredArgsConstructor
public class PositionController {

    private final PositionService positionService;

    @GetMapping
    public Flux<PositionResponse> findAll() {
        return positionService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<PositionResponse>> findById(@PathVariable Long id) {
        return positionService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<PositionResponse>> create(@Valid @RequestBody PositionRequest request) {
        return positionService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<PositionResponse>> update(@PathVariable Long id, @Valid @RequestBody PositionRequest request) {
        return positionService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return positionService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
