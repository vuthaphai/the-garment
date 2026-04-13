package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record ControllerResponse(
        Long id,
        String controllerName,
        LocalDateTime createdAt
) {}
