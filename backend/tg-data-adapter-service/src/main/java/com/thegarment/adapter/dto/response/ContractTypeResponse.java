package com.thegarment.adapter.dto.response;

import java.time.LocalDateTime;

public record ContractTypeResponse(
        Long id,
        String contractName,
        String autoRule,
        Boolean isAuto,
        Integer duration,
        Integer warning,
        LocalDateTime createdAt
) {}
