package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GroupRequest(
        @NotBlank @Size(max = 100) String groupName,
        @Size(max = 255) String description
) {}
