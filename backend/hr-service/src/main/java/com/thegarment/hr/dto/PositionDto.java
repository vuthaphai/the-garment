package com.thegarment.hr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class PositionDto {
    private Long id;
    private String nativeName;
    private String foreignName;
    private String description;
}
