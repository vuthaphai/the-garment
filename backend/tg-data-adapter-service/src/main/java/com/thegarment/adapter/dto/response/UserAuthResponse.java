package com.thegarment.adapter.dto.response;

import java.util.List;

public record UserAuthResponse(
        String username,
        String password,
        List<String> roles,
        boolean enabled
) {}