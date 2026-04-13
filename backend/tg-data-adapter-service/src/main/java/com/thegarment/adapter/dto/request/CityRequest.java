package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CityRequest(
        @NotBlank @Size(max = 100) String nativeName,
        @Size(max = 100) String foreignName
) {}
