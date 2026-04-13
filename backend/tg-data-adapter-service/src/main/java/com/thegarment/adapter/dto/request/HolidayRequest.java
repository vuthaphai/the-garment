package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record HolidayRequest(
        @NotNull LocalDate holidayDate,
        String nativeName,
        String foreignName,
        String description,
        @NotNull Integer year
) {}
