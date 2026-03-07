package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.AttendanceDaily;
import com.thegarment.attendance.repository.AttendanceDailyRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/attendance/daily")
@RequiredArgsConstructor
@Tag(name = "Daily Attendance", description = "Daily attendance data view")
public class AttendanceDailyController {

    private final AttendanceDailyRepository repository;

    @GetMapping
    @Operation(summary = "Query daily attendance with filters and pagination")
    public ResponseEntity<ApiResponse<Page<AttendanceDaily>>> search(
            @RequestParam(required = false) String empCardNo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Page<AttendanceDaily> result = repository.search(
                empCardNo, dateFrom, dateTo, PageRequest.of(page, size));
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
