package com.thegarment.bff.service;

import com.thegarment.bff.dto.LoginRequest;
import com.thegarment.bff.dto.LoginResponse;
import com.thegarment.bff.dto.RefreshTokenRequest;
import reactor.core.publisher.Mono;

public interface AuthService {
    Mono<LoginResponse> login(LoginRequest request);
    Mono<LoginResponse> refresh(RefreshTokenRequest request);
}
