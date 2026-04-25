package com.thegarment.bff.controller;

import com.thegarment.bff.dto.CurrentUserResponse;
import com.thegarment.bff.dto.LoginRequest;
import com.thegarment.bff.dto.LoginResponse;
import com.thegarment.bff.dto.RefreshTokenRequest;
import com.thegarment.bff.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping("/logout")
    public Mono<ResponseEntity<Void>> logout() {
        return authService.logout().thenReturn(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @GetMapping("/me")
    public Mono<ResponseEntity<CurrentUserResponse>> me() {
        return authService.currentUser().map(ResponseEntity::ok);
    }
}
