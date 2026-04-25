package com.thegarment.bff.security;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    private static final String SECRET = "12345678901234567890123456789012";

    @Test
    void shouldGenerateAndParseAccessToken() {
        JwtTokenProvider provider = new JwtTokenProvider(SECRET, 60_000L, 120_000L);

        String token = provider.generateAccessToken("admin", List.of("ADMIN", "HR"));

        assertThat(provider.validateToken(token)).isTrue();
        assertThat(provider.getUsernameFromToken(token)).isEqualTo("admin");
        assertThat(provider.getRolesFromToken(token)).containsExactly("ADMIN", "HR");
    }

    @Test
    void shouldRejectMalformedToken() {
        JwtTokenProvider provider = new JwtTokenProvider(SECRET, 60_000L, 120_000L);

        assertThat(provider.validateToken("not-a-jwt")).isFalse();
    }
}
