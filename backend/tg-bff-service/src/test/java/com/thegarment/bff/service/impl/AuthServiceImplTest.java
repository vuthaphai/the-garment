package com.thegarment.bff.service.impl;

import com.thegarment.bff.dto.LoginRequest;
import com.thegarment.bff.dto.RefreshTokenRequest;
import com.thegarment.bff.exception.BusinessException;
import com.thegarment.bff.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private ReactiveAuthenticationManager authenticationManager;

    @Mock
    private ReactiveUserDetailsService userDetailsService;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(authenticationManager, userDetailsService, jwtTokenProvider);
        ReflectionTestUtils.setField(authService, "accessTokenExpiry", 3_600_000L);
    }

    @Test
    void loginShouldAuthenticateAndReturnTokens() {
        var auth = new UsernamePasswordAuthenticationToken(
                "admin",
                "secret",
                List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_HR")));
        when(authenticationManager.authenticate(any())).thenReturn(Mono.just(auth));
        when(jwtTokenProvider.generateAccessToken("admin", List.of("ADMIN", "HR"))).thenReturn("access-token");
        when(jwtTokenProvider.generateRefreshToken("admin")).thenReturn("refresh-token");

        StepVerifier.create(authService.login(new LoginRequest("admin", "secret")))
                .expectNextMatches(response -> response.accessToken().equals("access-token")
                        && response.refreshToken().equals("refresh-token")
                        && response.username().equals("admin")
                        && response.role().equals("ADMIN")
                        && response.roles().equals(List.of("ADMIN", "HR"))
                        && response.expiresIn() == 3600)
                .verifyComplete();

        verify(authenticationManager).authenticate(any());
    }

    @Test
    void refreshShouldRejectInvalidToken() {
        when(jwtTokenProvider.validateToken("bad-refresh")).thenReturn(false);

        StepVerifier.create(authService.refresh(new RefreshTokenRequest("bad-refresh")))
                .expectErrorSatisfies(error -> org.assertj.core.api.Assertions.assertThat(error)
                        .isInstanceOf(BusinessException.class)
                        .hasMessage("Invalid or expired refresh token"))
                .verify();
    }

    @Test
    void refreshShouldIssueNewTokensForValidRefreshToken() {
        UserDetails userDetails = User.withUsername("admin")
                .password("ignored")
                .authorities("ROLE_MANAGER")
                .build();

        when(jwtTokenProvider.validateToken("refresh-token")).thenReturn(true);
        when(jwtTokenProvider.getUsernameFromToken("refresh-token")).thenReturn("admin");
        when(userDetailsService.findByUsername("admin")).thenReturn(Mono.just(userDetails));
        when(jwtTokenProvider.generateAccessToken("admin", List.of("MANAGER"))).thenReturn("new-access");
        when(jwtTokenProvider.generateRefreshToken("admin")).thenReturn("new-refresh");

        StepVerifier.create(authService.refresh(new RefreshTokenRequest("refresh-token")))
                .expectNextMatches(response -> response.accessToken().equals("new-access")
                        && response.refreshToken().equals("new-refresh")
                        && response.role().equals("MANAGER")
                        && response.roles().equals(List.of("MANAGER")))
                .verifyComplete();
    }
}
