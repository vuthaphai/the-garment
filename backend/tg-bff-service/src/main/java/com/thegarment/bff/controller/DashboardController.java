package com.thegarment.bff.controller;

import com.thegarment.bff.dto.DashboardHomeResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    @GetMapping("/home")
    @PreAuthorize("isAuthenticated()")
    public Mono<ResponseEntity<DashboardHomeResponse>> home() {
        return ReactiveSecurityContextHolder.getContext()
                .map(ctx -> ctx.getAuthentication())
                .map(auth -> auth.getAuthorities().stream()
                        .map(a -> a.getAuthority().replace("ROLE_", ""))
                        .toList())
                .zipWith(ReactiveSecurityContextHolder.getContext().map(ctx -> ctx.getAuthentication().getName()))
                .map(tuple -> new DashboardHomeResponse(
                        tuple.getT2(),
                        tuple.getT1(),
                        List.of("employee-summary", "attendance-today", "notifications")))
                .map(ResponseEntity::ok);
    }
}