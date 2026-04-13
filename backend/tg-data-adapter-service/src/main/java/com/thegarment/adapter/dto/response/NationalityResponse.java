package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record NationalityResponse(
        Long id,
        String nativeName,
        String foreignName,
        String description,
        LocalDateTime createdAt
) {}
