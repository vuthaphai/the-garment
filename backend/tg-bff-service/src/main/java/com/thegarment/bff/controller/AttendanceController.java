package com.thegarment.bff.controller;

import com.thegarment.bff.service.DataAdapterProxyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Tag(name = "Attendance", description = "BFF endpoints for attendance operations")
public class AttendanceController {

    private static final String ATTENDANCE_CHECK_ROLES = "hasAnyRole('ADMIN','HR','USER')";
    private static final String ATTENDANCE_WRITE_ROLES = "hasAnyRole('ADMIN','HR')";

    private final DataAdapterProxyService dataAdapterProxyService;

    @GetMapping("/api/v1/attendance/daily")
    @Operation(summary = "List daily attendance", description = "Attendance review for Admin/HR/User")
    @PreAuthorize(ATTENDANCE_CHECK_ROLES)
    public Mono<ResponseEntity<String>> listDailyAttendance(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String empCardNo,
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        StringBuilder path = new StringBuilder("/api/v1/attendance-daily/page?page=")
                .append(page)
                .append("&size=")
                .append(size);
        if (empCardNo != null && !empCardNo.isBlank()) {
            path.append("&empCardNo=").append(empCardNo);
        }
        if (dateFrom != null && !dateFrom.isBlank()) {
            path.append("&dateFrom=").append(dateFrom);
        }
        if (dateTo != null && !dateTo.isBlank()) {
            path.append("&dateTo=").append(dateTo);
        }
        return dataAdapterProxyService.get(path.toString());
    }

    @PostMapping("/api/v1/attendance/daily/download")
    @Operation(summary = "Download attendance", description = "Trigger attendance download from finger print machine")
    @PreAuthorize(ATTENDANCE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> downloadAttendance() {
        return dataAdapterProxyService.post("/api/v1/attendance-daily/download", Mono.just("{}"));
    }

    @PostMapping("/api/v1/attendance/daily")
    @Operation(summary = "Create attendance", description = "Insert daily attendance for employee")
    @PreAuthorize(ATTENDANCE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> createAttendance(@RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.post("/api/v1/attendance-daily", requestBody);
    }

    @PutMapping("/api/v1/attendance/daily/{id}")
    @Operation(summary = "Update attendance", description = "Update daily attendance for employee")
    @PreAuthorize(ATTENDANCE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> updateAttendance(@PathVariable Long id,
            @RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.put("/api/v1/attendance-daily/" + id, requestBody);
    }

    @DeleteMapping("/api/v1/attendance/daily/{id}")
    @Operation(summary = "Delete attendance", description = "Delete daily attendance record")
    @PreAuthorize(ATTENDANCE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> deleteAttendance(@PathVariable Long id) {
        return dataAdapterProxyService.delete("/api/v1/attendance-daily/" + id);
    }
}
