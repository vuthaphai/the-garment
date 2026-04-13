package com.thegarment.adapter.dto.request;

import java.math.BigDecimal;
import java.time.LocalTime;

public record ShiftRequest(
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
        BigDecimal foodAllowanceOt3
) {}
