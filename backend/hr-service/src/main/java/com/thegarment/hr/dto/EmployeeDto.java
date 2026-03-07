package com.thegarment.hr.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class EmployeeDto {
    private Long id;
    private String empCardNo;
    private String serialCardNo;
    private String nativeName;
    private String foreignName;
    private LocalDate dateOfBirth;
    private Long nationalityId;
    private String nationalityName;
    private String sex;
    private String socialSecurity;
    private String electionCard;
    private String placeOfBirth;
    private Long cityId;
    private String cityName;
    private String maritalStatus;
    private String spouseName;
    private Integer childrenCount;
    private String email;
    private String currentAddress;
    private String description;
    private String tel;
    private String driverLicense;
    private Boolean healthCheckUp;
    private Boolean workBook;
    private Integer fingerPrint;
    private String familyListNum;
    private Integer anlOldUsed;
    private Long groupPositionId;
    private String groupPositionName;
    private Long groupId;
    private String groupName;
    private Long positionId;
    private String positionName;
    private LocalDate dateJoined;
    private LocalDate dateResigned;
    private String paymentType;
    private String currency;
    private BigDecimal salary;
    private String photoPath;
    private Boolean active;
    private List<EmployeeContractDto> contracts;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class EmployeeContractDto {
        private Long id;
        private Long contractTypeId;
        private String contractTypeName;
        private LocalDate fromDate;
        private LocalDate toDate;
        private Integer months;
    }
}
