package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.response.AttendanceDailyResponse;
import com.thegarment.adapter.service.AttendanceDailyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/attendance-daily")
@RequiredArgsConstructor
public class AttendanceDailyController {

    private final AttendanceDailyService attendanceDailyService;

    @GetMapping("/page")
    public Mono<ResponseEntity<PageResponse<AttendanceDailyResponse>>> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String empCardNo) {
        return attendanceDailyService.findPage(page, size, empCardNo).map(ResponseEntity::ok);
    }
}
