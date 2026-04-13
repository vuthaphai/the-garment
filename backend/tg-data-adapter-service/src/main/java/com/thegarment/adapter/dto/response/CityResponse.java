package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record CityResponse(
        Long id,
        String nativeName,
        String foreignName,
        LocalDateTime createdAt
) {}
