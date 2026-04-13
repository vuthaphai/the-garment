package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.GroupPositionRequest;
import com.thegarment.adapter.dto.response.GroupPositionResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupPositionService {
    Flux<GroupPositionResponse> findAll();
    Mono<GroupPositionResponse> findById(Long id);
    Mono<GroupPositionResponse> create(GroupPositionRequest request);
    Mono<GroupPositionResponse> update(Long id, GroupPositionRequest request);
    Mono<Void> delete(Long id);
    Mono<PageResponse<GroupPositionResponse>> findPage(int page, int size);
}
