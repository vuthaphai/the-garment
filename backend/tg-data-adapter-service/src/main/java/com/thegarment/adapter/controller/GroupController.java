package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.request.GroupRequest;
import com.thegarment.adapter.dto.response.GroupResponse;
import com.thegarment.adapter.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public Flux<GroupResponse> findAll() {
        return groupService.findAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<GroupResponse>> findById(@PathVariable Long id) {
        return groupService.findById(id).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<GroupResponse>> create(@Valid @RequestBody GroupRequest request) {
        return groupService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<GroupResponse>> update(@PathVariable Long id, @Valid @RequestBody GroupRequest request) {
        return groupService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return groupService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
