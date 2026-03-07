package com.thegarment.hr.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContractTypeRequest {
    @NotBlank(message = "Contract name is required")
    private String contractName;
    private String autoRule;
    private Boolean isAuto = false;
    private Integer duration;
    private Integer warning;
}
