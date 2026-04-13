package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String username,
        String fullName,
        String role,
        String language,
        Boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
