package com.thegarment.bff.dto;

import java.util.List;

public record AuthUserResponse(
        String username,
        String password,
        List<String> roles,
        boolean enabled
) {}