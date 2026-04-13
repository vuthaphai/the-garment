package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record GroupResponse(
        Long id,
        String groupName,
        String description,
        LocalDateTime createdAt
) {}
