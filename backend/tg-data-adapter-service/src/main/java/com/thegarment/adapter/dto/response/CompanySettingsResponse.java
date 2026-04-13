package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record CompanySettingsResponse(
        Long id,
        String companyName,
        Integer workingDayPerMonth,
        Integer workingHourPerDay,
        Integer checkAttendanceType,
        Integer allowCheckBeforePayroll,
        Integer roundRiel,
        String attendanceAllowanceType,
        Boolean saturdayWorking,
        Integer saturdayHours,
        Boolean setHolidayByGroup,
        String downloadDataFrom,
        Boolean cutAttendance,
        Integer cutPrim,
        Integer workUnder14Days,
        Integer workFrom14DaysUp,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
