package com.thegarment.adapter.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record HolidayResponse(
        Long id,
        LocalDate holidayDate,
        String nativeName,
        String foreignName,
        String description,
        Integer year,
        LocalDateTime createdAt
) {}
