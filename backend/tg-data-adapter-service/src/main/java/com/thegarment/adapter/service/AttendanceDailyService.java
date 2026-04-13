package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.response.AttendanceDailyResponse;
import reactor.core.publisher.Mono;

public interface AttendanceDailyService {
    Mono<PageResponse<AttendanceDailyResponse>> findPage(int page, int size, String empCardNo);
}
