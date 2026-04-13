package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContractTypeRequest(
        @NotBlank @Size(max = 100) String contractName,
        @Size(max = 100) String autoRule,
        Boolean isAuto,
        Integer duration,
        Integer warning
) {}
