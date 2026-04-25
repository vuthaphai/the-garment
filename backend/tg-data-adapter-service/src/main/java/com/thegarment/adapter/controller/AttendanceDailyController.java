package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.AttendanceDailyRequest;
import com.thegarment.adapter.dto.response.AttendanceDailyResponse;
import com.thegarment.adapter.service.AttendanceDailyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/attendance-daily")
@RequiredArgsConstructor
public class AttendanceDailyController {

    private final AttendanceDailyService attendanceDailyService;

    @GetMapping("/page")
    public Mono<ResponseEntity<PageResponse<AttendanceDailyResponse>>> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String empCardNo,
            @RequestParam(required = false) LocalDate dateFrom,
            @RequestParam(required = false) LocalDate dateTo) {
        return attendanceDailyService.findPage(page, size, empCardNo, dateFrom, dateTo).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<AttendanceDailyResponse>> create(@RequestBody AttendanceDailyRequest request) {
        return attendanceDailyService.create(request)
                .map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<AttendanceDailyResponse>> update(@PathVariable Long id,
            @RequestBody AttendanceDailyRequest request) {
        return attendanceDailyService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return attendanceDailyService.delete(id).thenReturn(ResponseEntity.noContent().build());
    }

    @PostMapping("/download")
    public Mono<ResponseEntity<String>> download() {
        return attendanceDailyService.downloadFromFingerPrinter().map(ResponseEntity::ok);
    }
}
