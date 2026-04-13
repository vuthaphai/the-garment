package com.thegarment.bff.controller;

import com.thegarment.bff.dto.LoginRequest;
import com.thegarment.bff.dto.LoginResponse;
import com.thegarment.bff.dto.RefreshTokenRequest;
import com.thegarment.bff.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public Mono<ResponseEntity<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request).map(ResponseEntity::ok);
    }

    @PostMapping("/refresh")
    public Mono<ResponseEntity<LoginResponse>> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return authService.refresh(request).map(ResponseEntity::ok);
    }
}
