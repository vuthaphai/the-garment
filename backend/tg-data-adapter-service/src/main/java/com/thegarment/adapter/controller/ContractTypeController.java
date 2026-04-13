package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.ContractTypeRequest;
import com.thegarment.adapter.dto.response.ContractTypeResponse;
import com.thegarment.adapter.service.ContractTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/contract-types")
@RequiredArgsConstructor
public class ContractTypeController {

    private final ContractTypeService contractTypeService;

    @GetMapping
    public Flux<ContractTypeResponse> findAll() {
        return contractTypeService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ContractTypeResponse>> findById(@PathVariable Long id) {
        return contractTypeService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<ContractTypeResponse>> create(@Valid @RequestBody ContractTypeRequest request) {
        return contractTypeService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<ContractTypeResponse>> update(@PathVariable Long id, @Valid @RequestBody ContractTypeRequest request) {
        return contractTypeService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return contractTypeService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
