package com.thegarment.bff.controller;

import com.thegarment.bff.service.DataAdapterProxyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Tag(name = "Report", description = "BFF endpoints for report features")
public class ReportController {

    private final DataAdapterProxyService dataAdapterProxyService;

    @GetMapping("/api/v1/reports/attendance-summary")
    @Operation(summary = "Attendance summary report")
    @PreAuthorize("hasAnyRole('ADMIN','HR','ACCOUNTING')")
    public Mono<ResponseEntity<String>> attendanceSummary(
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        StringBuilder path = new StringBuilder("/api/v1/reports/attendance-summary");
        if ((dateFrom != null && !dateFrom.isBlank()) || (dateTo != null && !dateTo.isBlank())) {
            path.append("?");
            boolean hasParam = false;
            if (dateFrom != null && !dateFrom.isBlank()) {
                path.append("dateFrom=").append(dateFrom);
                hasParam = true;
            }
            if (dateTo != null && !dateTo.isBlank()) {
                if (hasParam) {
                    path.append("&");
                }
                path.append("dateTo=").append(dateTo);
            }
        }
        return dataAdapterProxyService.get(path.toString());
    }
}