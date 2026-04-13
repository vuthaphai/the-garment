package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NationalityRequest(
        @NotBlank @Size(max = 100) String nativeName,
        @Size(max = 100) String foreignName,
        @Size(max = 255) String description
) {}
