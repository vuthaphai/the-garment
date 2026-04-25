package com.thegarment.bff.dto;

import java.util.List;

public record DashboardHomeResponse(
        String username,
        List<String> roles,
        List<String> widgets
) {}