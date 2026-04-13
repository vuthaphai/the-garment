package com.thegarment.adapter.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record ShiftResponse(
        Long id,
        String nativeName,
        String foreignName,
        Integer authorizationBefore,
        Integer authorizationAfter,
        String shiftType,
        LocalTime firstStart, LocalTime firstEnd,
        LocalTime secondStart, LocalTime secondEnd,
        LocalTime ot1Start, LocalTime ot1End,
        LocalTime ot2Start, LocalTime ot2End,
        LocalTime ot3Start, LocalTime ot3End,
        BigDecimal ot1Rate, BigDecimal ot2Rate, BigDecimal ot3Rate,
        BigDecimal saturdayRate, BigDecimal sundayRate, BigDecimal holidayRate,
        BigDecimal shiftBonus,
        BigDecimal foodAllowanceOt1,
        BigDecimal foodAllowanceOt2Slot1,
        BigDecimal foodAllowanceOt2Slot2,
        BigDecimal foodAllowanceOt3,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
