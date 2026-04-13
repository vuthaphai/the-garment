package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.response.ControllerResponse;
import com.thegarment.adapter.service.ControllerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/controllers")
@RequiredArgsConstructor
public class ControllerController {

    private final ControllerService controllerService;

    @GetMapping
    public Flux<ControllerResponse> findAll() {
        return controllerService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<ControllerResponse>> findById(@PathVariable Long id) {
        return controllerService.findById(id).map(ResponseEntity::ok);
    }
}
