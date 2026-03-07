package com.thegarment.auth.security;

import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    // Must be ≥ 256 bits for HMAC-SHA256
    private static final String SECRET = "TGFybV9TZWN1cmUhQDIwMjZfR2FybWVudEhSU3lzdGVtX1NlY3JldEtleV8xMjM=";

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", SECRET);
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpiration", 28800000L);
    }

    @Test
    void generateToken_validInput_returnsNonBlankToken() {
        String token = jwtTokenProvider.generateToken(1L, "admin", "ADMIN");
        assertThat(token).isNotBlank();
    }

    @Test
    void validateAndGetClaims_validToken_returnsCorrectClaims() {
        String token = jwtTokenProvider.generateToken(42L, "john", "HR");

        Claims claims = jwtTokenProvider.validateAndGetClaims(token);

        assertThat(claims.getSubject()).isEqualTo("42");
        assertThat(claims.get("role", String.class)).isEqualTo("HR");
        assertThat(claims.get("username", String.class)).isEqualTo("john");
    }

    @Test
    void validateAndGetClaims_tamperedToken_throwsException() {
        String token = jwtTokenProvider.generateToken(1L, "admin", "ADMIN");
        String tamperedToken = token.substring(0, token.length() - 5) + "xxxxx";

        assertThatThrownBy(() -> jwtTokenProvider.validateAndGetClaims(tamperedToken))
                .isInstanceOf(Exception.class);
    }

    @Test
    void validateAndGetClaims_randomString_throwsException() {
        assertThatThrownBy(() -> jwtTokenProvider.validateAndGetClaims("not.a.jwt.token"))
                .isInstanceOf(Exception.class);
    }

    @Test
    void getExpirationMs_returnsConfiguredValue() {
        assertThat(jwtTokenProvider.getExpirationMs()).isEqualTo(28800000L);
    }
}
