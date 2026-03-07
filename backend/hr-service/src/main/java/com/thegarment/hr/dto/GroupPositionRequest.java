package com.thegarment.hr.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class GroupPositionRequest {
    @NotBlank(message = "Native name is required")
    private String nativeName;
    private String foreignName;
    private String description;
    private Boolean ot1 = false, ot2 = false, ot3 = false;
    private Boolean payForOt1Food = false, payForOt2Food = false, payForOt3Food = false;
    private Boolean payForSaturday = false, payForSunday = false, payForHoliday = false;
    private Boolean shiftAllowance = false, neverAbsence = false, allowOtHalfHour = false;
    private BigDecimal attendanceAllowance = BigDecimal.ZERO;
    private BigDecimal goHomePercent = BigDecimal.ZERO;
    private Integer pregnantDayAllowed = 0;
    private BigDecimal endContractPercent = BigDecimal.ZERO;
    private BigDecimal pregnantRate = BigDecimal.ZERO;
    private Integer annualLeaveDayAllowed = 0;
    private List<GroupPositionDto.LeaveIncreaseDto> leaveIncreases;
    private List<GroupPositionDto.SeniorityBonusDto> seniorityBonuses;
}
