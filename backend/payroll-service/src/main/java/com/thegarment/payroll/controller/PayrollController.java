package com.thegarment.payroll.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> status() {
        return ResponseEntity.ok(Map.of(
            "service", "payroll-service",
            "status", "running",
            "note", "Payroll processing coming soon"
        ));
    }
}
