package com.thegarment.bff.dto;

import java.util.List;

public record LoginResponse(
        String accessToken,
        String refreshToken,
        String tokenType,
        long expiresIn,
        String username,
        String role,
        List<String> roles
) {
    public static LoginResponse of(String accessToken, String refreshToken,
            long expiresIn, String username, List<String> roles) {
        String primaryRole = roles == null || roles.isEmpty() ? "VIEWER" : roles.get(0);
        return new LoginResponse(accessToken, refreshToken, "Bearer", expiresIn, username, primaryRole, roles);
    }
}
