package com.thegarment.hr.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class EmployeeRequest {
    @NotBlank(message = "Employee card number is required")
    private String empCardNo;
    private String serialCardNo;
    private String nativeName;
    private String foreignName;
    private LocalDate dateOfBirth;
    private Long nationalityId;
    private String sex = "F";
    private String socialSecurity;
    private String electionCard;
    private String placeOfBirth;
    private Long cityId;
    private String maritalStatus;
    private String spouseName;
    private Integer childrenCount = 0;
    private String email;
    private String currentAddress;
    private String description;
    private String tel;
    private String driverLicense;
    private Boolean healthCheckUp = false;
    private Boolean workBook = false;
    private Integer fingerPrint = 0;
    private String familyListNum;
    private Integer anlOldUsed = 0;
    private Long groupPositionId;
    private Long groupId;
    private Long positionId;
    private LocalDate dateJoined;
    private LocalDate dateResigned;
    private String paymentType = "Month";
    private String currency = "$";
    private BigDecimal salary;
    private Boolean active = true;
    private List<EmployeeDto.EmployeeContractDto> contracts;
}
