package com.thegarment.hr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class ContractTypeDto {
    private Long id;
    private String contractName;
    private String autoRule;
    private Boolean isAuto;
    private Integer duration;
    private Integer warning;
}
