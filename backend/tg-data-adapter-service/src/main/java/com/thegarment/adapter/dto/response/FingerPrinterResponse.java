package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record FingerPrinterResponse(
        Long id,
        String fingerPrintName,
        String ip,
        Integer port,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}