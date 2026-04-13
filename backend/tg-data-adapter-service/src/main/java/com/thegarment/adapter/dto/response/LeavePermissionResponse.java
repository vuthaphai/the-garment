package com.thegarment.adapter.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record LeavePermissionResponse(
        Long id,
        String empCardNo,
        String permissionType,
        LocalDate fromDate,
        LocalDate toDate,
        String description,
        BigDecimal leaveHours,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
