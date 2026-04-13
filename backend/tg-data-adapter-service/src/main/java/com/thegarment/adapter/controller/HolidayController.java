package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.HolidayRequest;
import com.thegarment.adapter.dto.response.HolidayResponse;
import com.thegarment.adapter.service.HolidayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/holidays")
@RequiredArgsConstructor
public class HolidayController {

    private final HolidayService holidayService;

    @GetMapping
    public Flux<HolidayResponse> findAll() {
        return holidayService.findAll();
    }

    @GetMapping("/year/{year}")
    public Flux<HolidayResponse> findByYear(@PathVariable Integer year) {
        return holidayService.findByYear(year);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<HolidayResponse>> findById(@PathVariable Long id) {
        return holidayService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<HolidayResponse>> create(@Valid @RequestBody HolidayRequest request) {
        return holidayService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<HolidayResponse>> update(@PathVariable Long id, @Valid @RequestBody HolidayRequest request) {
        return holidayService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return holidayService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
