package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.EmployeeRequest;
import com.thegarment.adapter.dto.response.EmployeeResponse;
import reactor.core.publisher.Mono;

public interface EmployeeService {
    Mono<PageResponse<EmployeeResponse>> findPage(int page, int size, Boolean active);
    Mono<EmployeeResponse> findById(Long id);
    Mono<EmployeeResponse> findByEmpCardNo(String empCardNo);
    Mono<EmployeeResponse> create(EmployeeRequest request);
    Mono<EmployeeResponse> update(Long id, EmployeeRequest request);
    Mono<Void> delete(Long id);
}
