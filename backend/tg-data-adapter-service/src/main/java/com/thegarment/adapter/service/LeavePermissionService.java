package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.LeavePermissionRequest;
import com.thegarment.adapter.dto.response.LeavePermissionResponse;
import reactor.core.publisher.Mono;

public interface LeavePermissionService {
    Mono<PageResponse<LeavePermissionResponse>> findPage(int page, int size, String empCardNo);
    Mono<LeavePermissionResponse> findById(Long id);
    Mono<LeavePermissionResponse> create(LeavePermissionRequest request);
    Mono<LeavePermissionResponse> update(Long id, LeavePermissionRequest request);
    Mono<Void> delete(Long id);
}
