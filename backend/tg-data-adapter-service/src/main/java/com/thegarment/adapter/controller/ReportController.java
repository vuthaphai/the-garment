package com.thegarment.adapter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    @GetMapping("/attendance-summary")
    public Mono<ResponseEntity<Map<String, Object>>> attendanceSummary(
            @RequestParam(required = false) LocalDate dateFrom,
            @RequestParam(required = false) LocalDate dateTo) {
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("status", "in-progress");
        payload.put("message", "Attendance summary report endpoint is ready for full implementation");
        payload.put("dateFrom", dateFrom);
        payload.put("dateTo", dateTo);
        return Mono.just(ResponseEntity.ok(payload));
    }
}