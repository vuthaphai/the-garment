package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

public record GroupPositionRequest(
        @NotBlank @Size(max = 100) String nativeName,
        @Size(max = 100) String foreignName,
        String description,
        Boolean ot1, Boolean ot2, Boolean ot3,
        Boolean payForOt1Food, Boolean payForOt2Food, Boolean payForOt3Food,
        Boolean payForSaturday, Boolean payForSunday, Boolean payForHoliday,
        Boolean shiftAllowance, Boolean neverAbsence, Boolean allowOtHalfHour,
        BigDecimal attendanceAllowance,
        BigDecimal goHomePercent,
        Integer pregnantDayAllowed,
        BigDecimal endContractPercent,
        BigDecimal pregnantRate,
        Integer annualLeaveDayAllowed,
        List<LeaveIncreaseItem> leaveIncreases,
        List<SeniorityBonusItem> seniorityBonuses
) {
    public record LeaveIncreaseItem(Integer year, Integer days) {}
    public record SeniorityBonusItem(Integer year, BigDecimal amount, BigDecimal percent) {}
}
