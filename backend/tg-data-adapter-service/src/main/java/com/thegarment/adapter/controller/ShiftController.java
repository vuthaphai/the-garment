package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.ShiftRequest;
import com.thegarment.adapter.dto.response.ShiftResponse;
import com.thegarment.adapter.service.ShiftService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/shifts")
@RequiredArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @GetMapping
    public Flux<ShiftResponse> findAll() {
        return shiftService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ShiftResponse>> findById(@PathVariable Long id) {
        return shiftService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<ShiftResponse>> create(@Valid @RequestBody ShiftRequest request) {
        return shiftService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<ShiftResponse>> update(@PathVariable Long id, @Valid @RequestBody ShiftRequest request) {
        return shiftService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return shiftService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
