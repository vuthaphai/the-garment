package com.thegarment.adapter.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record AttendanceDailyRequest(
        String empCardNo,
        LocalDate scanDate,
        LocalTime t1,
        LocalTime t2,
        LocalTime t3,
        LocalTime t4,
        LocalTime t5,
        LocalTime t6,
        LocalTime t7,
        LocalTime t8,
        BigDecimal workingHours,
        String workDayType,
        BigDecimal leaveHours,
        String leaveType,
        BigDecimal ot1,
        BigDecimal ot2,
        BigDecimal ot3
) {}