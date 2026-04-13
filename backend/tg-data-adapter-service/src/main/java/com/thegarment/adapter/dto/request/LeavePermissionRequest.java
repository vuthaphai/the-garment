package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LeavePermissionRequest(
        @NotBlank String empCardNo,
        @NotBlank String permissionType,
        LocalDate fromDate,
        LocalDate toDate,
        String description,
        BigDecimal leaveHours
) {}
