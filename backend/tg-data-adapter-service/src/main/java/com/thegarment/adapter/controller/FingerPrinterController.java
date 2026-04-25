package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.FingerPrinterRequest;
import com.thegarment.adapter.dto.response.FingerPrinterResponse;
import com.thegarment.adapter.service.FingerPrinterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/finger-printers")
@RequiredArgsConstructor
public class FingerPrinterController {

    private final FingerPrinterService fingerPrinterService;

    @GetMapping
    public Flux<FingerPrinterResponse> findAll() {
        return fingerPrinterService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<FingerPrinterResponse>> findById(@PathVariable Long id) {
        return fingerPrinterService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<FingerPrinterResponse>> create(@RequestBody FingerPrinterRequest request) {
        return fingerPrinterService.create(request)
                .map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<FingerPrinterResponse>> update(@PathVariable Long id,
            @RequestBody FingerPrinterRequest request) {
        return fingerPrinterService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return fingerPrinterService.delete(id).thenReturn(ResponseEntity.noContent().build());
    }
}