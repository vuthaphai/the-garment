package com.thegarment.hr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class NationalityDto {
    private Long id;
    private String nativeName;
    private String foreignName;
    private String description;
}
