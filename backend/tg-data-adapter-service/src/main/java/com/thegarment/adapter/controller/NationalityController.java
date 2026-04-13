package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.NationalityRequest;
import com.thegarment.adapter.dto.response.NationalityResponse;
import com.thegarment.adapter.service.NationalityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/nationalities")
@RequiredArgsConstructor
public class NationalityController {

    private final NationalityService nationalityService;

    @GetMapping
    public Flux<NationalityResponse> findAll() {
        return nationalityService.findAll();
    }

    @GetMapping("/page")
    public Mono<ResponseEntity<PageResponse<NationalityResponse>>> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return nationalityService.findPage(page, size).map(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<NationalityResponse>> findById(@PathVariable Long id) {
        return nationalityService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<NationalityResponse>> create(@Valid @RequestBody NationalityRequest request) {
        return nationalityService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<NationalityResponse>> update(@PathVariable Long id,
            @Valid @RequestBody NationalityRequest request) {
        return nationalityService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return nationalityService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
