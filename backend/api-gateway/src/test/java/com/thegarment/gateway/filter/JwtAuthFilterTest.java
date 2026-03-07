package com.thegarment.gateway.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.test.util.ReflectionTestUtils;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtAuthFilterTest {

    private static final String SECRET = "TGFybV9TZWN1cmUhQDIwMjZfR2FybWVudEhSU3lzdGVtX1NlY3JldEtleV8xMjM=";

    @InjectMocks
    private JwtAuthFilter jwtAuthFilter;

    @BeforeEach
    void injectSecret() {
        ReflectionTestUtils.setField(jwtAuthFilter, "jwtSecret", SECRET);
    }

    @Test
    void apply_missingAuthHeader_returnsUnauthorized() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/hr/employees").build());
        GatewayFilterChain chain = mock(GatewayFilterChain.class);

        GatewayFilter filter = jwtAuthFilter.apply(new JwtAuthFilter.Config());
        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(any());
    }

    @Test
    void apply_nonBearerToken_returnsUnauthorized() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/hr/employees")
                        .header(HttpHeaders.AUTHORIZATION, "Basic dXNlcjpwYXNz")
                        .build());
        GatewayFilterChain chain = mock(GatewayFilterChain.class);

        GatewayFilter filter = jwtAuthFilter.apply(new JwtAuthFilter.Config());
        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(any());
    }

    @Test
    void apply_invalidJwtToken_returnsUnauthorized() {
        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/hr/employees")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer this.is.invalid")
                        .build());
        GatewayFilterChain chain = mock(GatewayFilterChain.class);

        GatewayFilter filter = jwtAuthFilter.apply(new JwtAuthFilter.Config());
        filter.filter(exchange, chain).block();

        assertThat(exchange.getResponse().getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(any());
    }

    @Test
    void apply_validJwt_callsChainFilter() {
        String validToken = buildValidToken("1", "ADMIN", "john");

        MockServerWebExchange exchange = MockServerWebExchange.from(
                MockServerHttpRequest.get("/api/hr/employees")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + validToken)
                        .build());
        GatewayFilterChain chain = mock(GatewayFilterChain.class);
        when(chain.filter(any())).thenReturn(Mono.empty());

        GatewayFilter filter = jwtAuthFilter.apply(new JwtAuthFilter.Config());
        filter.filter(exchange, chain).block();

        // 401 should NOT be set — response status remains null (200 default in mock)
        assertThat(exchange.getResponse().getStatusCode()).isNotEqualTo(HttpStatus.UNAUTHORIZED);
        verify(chain).filter(any());
    }

    private String buildValidToken(String subject, String role, String username) {
        Key key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .subject(subject)
                .claim("role", role)
                .claim("username", username)
                .issuedAt(new Date(now))
                .expiration(new Date(now + 28_800_000L))
                .signWith(key)
                .compact();
    }
}
