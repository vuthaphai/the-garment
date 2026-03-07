package com.thegarment.hr.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NationalityRequest {
    @NotBlank(message = "Native name is required")
    private String nativeName;
    private String foreignName;
    private String description;
}
