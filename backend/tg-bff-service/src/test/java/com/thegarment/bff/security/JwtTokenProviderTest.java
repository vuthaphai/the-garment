package com.thegarment.bff.security;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JwtTokenProviderTest {

    private static final String SECRET = "12345678901234567890123456789012";

    @Test
    void shouldGenerateAndParseAccessToken() {
        JwtTokenProvider provider = new JwtTokenProvider(SECRET, 60_000L, 120_000L);

        String token = provider.generateAccessToken("admin", "ADMIN");

        assertThat(provider.validateToken(token)).isTrue();
        assertThat(provider.getUsernameFromToken(token)).isEqualTo("admin");
        assertThat(provider.getRoleFromToken(token)).isEqualTo("ADMIN");
    }

    @Test
    void shouldRejectMalformedToken() {
        JwtTokenProvider provider = new JwtTokenProvider(SECRET, 60_000L, 120_000L);

        assertThat(provider.validateToken("not-a-jwt")).isFalse();
    }
}
