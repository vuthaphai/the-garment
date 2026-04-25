package com.thegarment.bff.dto;

import java.util.List;

public record CurrentUserResponse(
        String username,
        List<String> roles
) {}