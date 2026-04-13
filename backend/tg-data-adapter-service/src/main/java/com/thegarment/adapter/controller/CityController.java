package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.CityRequest;
import com.thegarment.adapter.dto.response.CityResponse;
import com.thegarment.adapter.service.CityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/cities")
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping
    public Flux<CityResponse> findAll() {
        return cityService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<CityResponse>> findById(@PathVariable Long id) {
        return cityService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<CityResponse>> create(@Valid @RequestBody CityRequest request) {
        return cityService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<CityResponse>> update(@PathVariable Long id, @Valid @RequestBody CityRequest request) {
        return cityService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return cityService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
