package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.request.GroupRequest;
import com.thegarment.adapter.dto.response.GroupResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupService {
    Flux<GroupResponse> findAll();
    Mono<GroupResponse> findById(Long id);
    Mono<GroupResponse> create(GroupRequest request);
    Mono<GroupResponse> update(Long id, GroupRequest request);
    Mono<Void> delete(Long id);
}
