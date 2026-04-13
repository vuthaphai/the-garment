package com.thegarment.adapter.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record EmployeeRequest(
        @NotBlank @Size(max = 50) String empCardNo,
        @Size(max = 50) String serialCardNo,
        @Size(max = 100) String nativeName,
        @Size(max = 100) String foreignName,
        LocalDate dateOfBirth,
        Long nationalityId,
        @Size(max = 1) String sex,
        @Size(max = 50) String socialSecurity,
        @Size(max = 50) String electionCard,
        @Size(max = 255) String placeOfBirth,
        Long cityId,
        @Size(max = 20) String maritalStatus,
        @Size(max = 100) String spouseName,
        Integer childrenCount,
        @Size(max = 100) String email,
        String currentAddress,
        String description,
        @Size(max = 20) String tel,
        @Size(max = 50) String driverLicense,
        Boolean healthCheckUp,
        Boolean workBook,
        Integer fingerPrint,
        @Size(max = 50) String familyListNum,
        Integer anlOldUsed,
        Long groupPositionId,
        Long groupId,
        Long positionId,
        LocalDate dateJoined,
        LocalDate dateResigned,
        @Size(max = 20) String paymentType,
        @Size(max = 10) String currency,
        BigDecimal salary,
        @Size(max = 500) String photoPath,
        Boolean active,
        List<ContractItem> contracts
) {
    public record ContractItem(Long contractTypeId, LocalDate fromDate, LocalDate toDate, Integer months) {}
}
