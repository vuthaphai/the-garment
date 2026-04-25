package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.AttendanceDailyRequest;
import com.thegarment.adapter.dto.response.AttendanceDailyResponse;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

public interface AttendanceDailyService {
    Mono<PageResponse<AttendanceDailyResponse>> findPage(int page, int size, String empCardNo,
            LocalDate dateFrom, LocalDate dateTo);
    Mono<AttendanceDailyResponse> create(AttendanceDailyRequest request);
    Mono<AttendanceDailyResponse> update(Long id, AttendanceDailyRequest request);
    Mono<Void> delete(Long id);
    Mono<String> downloadFromFingerPrinter();
}
