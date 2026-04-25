package com.thegarment.bff.service.impl;

import com.thegarment.bff.dto.CurrentUserResponse;
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
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

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
                    List<String> roles = extractRoles(auth.getAuthorities());
                    String accessToken = jwtTokenProvider.generateAccessToken(request.username(), roles);
                    String refreshToken = jwtTokenProvider.generateRefreshToken(request.username());
                    return LoginResponse.of(accessToken, refreshToken, accessTokenExpiry / 1000,
                            request.username(), roles);
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
                                        List<String> roles = extractRoles(userDetails.getAuthorities());
                                        String newAccessToken = jwtTokenProvider.generateAccessToken(username, roles);
                    String newRefreshToken = jwtTokenProvider.generateRefreshToken(username);
                    return LoginResponse.of(newAccessToken, newRefreshToken,
                                                        accessTokenExpiry / 1000, username, roles);
                });
    }

        @Override
        public Mono<Void> logout() {
                // Stateless JWT logout: client discards token; server can add blacklist later if needed.
                return Mono.empty();
        }

        @Override
        public Mono<CurrentUserResponse> currentUser() {
                return ReactiveSecurityContextHolder.getContext()
                                .map(ctx -> ctx.getAuthentication())
                                .filter(auth -> auth != null && auth.isAuthenticated())
                                .map(auth -> new CurrentUserResponse(auth.getName(), extractRoles(auth.getAuthorities())))
                                .switchIfEmpty(Mono.error(new BusinessException("Unauthenticated user")));
        }

        private List<String> extractRoles(Iterable<? extends GrantedAuthority> authorities) {
                List<String> roles = new ArrayList<>();
                for (GrantedAuthority authority : authorities) {
                        String role = authority.getAuthority().replace("ROLE_", "").trim().toUpperCase();
                        if (StringUtils.hasText(role) && !roles.contains(role)) {
                                roles.add(role);
                        }
                }
                return roles.isEmpty() ? List.of("VIEWER") : roles;
        }
}
