package com.thegarment.bff.dto;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String username,
        String password,
        String role,
        boolean enabled,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
