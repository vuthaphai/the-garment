package com.thegarment.bff.service.impl;

import com.thegarment.bff.dto.LoginRequest;
import com.thegarment.bff.dto.LoginResponse;
import com.thegarment.bff.dto.RefreshTokenRequest;
import com.thegarment.bff.exception.BusinessException;
import com.thegarment.bff.security.JwtTokenProvider;
import com.thegarment.bff.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final ReactiveAuthenticationManager authenticationManager;
    private final ReactiveUserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.access-token-expiry:3600000}")
    private long accessTokenExpiry;

    @Override
    public Mono<LoginResponse> login(LoginRequest request) {
        return authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        request.username(), request.password()))
                .map(auth -> {
                    String role = auth.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .map(a -> a.replace("ROLE_", ""))
                            .findFirst().orElse("VIEWER");
                    String accessToken = jwtTokenProvider.generateAccessToken(request.username(), role);
                    String refreshToken = jwtTokenProvider.generateRefreshToken(request.username());
                    return LoginResponse.of(accessToken, refreshToken, accessTokenExpiry / 1000,
                            request.username(), role);
                });
    }

    @Override
    public Mono<LoginResponse> refresh(RefreshTokenRequest request) {
        if (!jwtTokenProvider.validateToken(request.refreshToken())) {
            return Mono.error(new BusinessException("Invalid or expired refresh token"));
        }
        String username = jwtTokenProvider.getUsernameFromToken(request.refreshToken());
        return userDetailsService.findByUsername(username)
                .map(userDetails -> {
                    String role = userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .map(a -> a.replace("ROLE_", ""))
                            .findFirst().orElse("VIEWER");
                    String newAccessToken = jwtTokenProvider.generateAccessToken(username, role);
                    String newRefreshToken = jwtTokenProvider.generateRefreshToken(username);
                    return LoginResponse.of(newAccessToken, newRefreshToken,
                            accessTokenExpiry / 1000, username, role);
                });
    }
}
