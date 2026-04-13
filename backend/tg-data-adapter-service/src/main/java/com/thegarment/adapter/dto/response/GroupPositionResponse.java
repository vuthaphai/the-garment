package com.thegarment.adapter.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record GroupPositionResponse(
        Long id,
        String nativeName,
        String foreignName,
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
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<LeaveIncreaseItem> leaveIncreases,
        List<SeniorityBonusItem> seniorityBonuses
) {
    public record LeaveIncreaseItem(Long id, Integer year, Integer days) {}
    public record SeniorityBonusItem(Long id, Integer year, BigDecimal amount, BigDecimal percent) {}
}
