package com.thegarment.hr.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class GroupPositionDto {
    private Long id;
    private String nativeName;
    private String foreignName;
    private String description;
    private Boolean ot1, ot2, ot3;
    private Boolean payForOt1Food, payForOt2Food, payForOt3Food;
    private Boolean payForSaturday, payForSunday, payForHoliday;
    private Boolean shiftAllowance, neverAbsence, allowOtHalfHour;
    private BigDecimal attendanceAllowance;
    private BigDecimal goHomePercent;
    private Integer pregnantDayAllowed;
    private BigDecimal endContractPercent;
    private BigDecimal pregnantRate;
    private Integer annualLeaveDayAllowed;
    private List<LeaveIncreaseDto> leaveIncreases;
    private List<SeniorityBonusDto> seniorityBonuses;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class LeaveIncreaseDto {
        private Long id;
        private Integer year;
        private Integer days;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class SeniorityBonusDto {
        private Long id;
        private Integer year;
        private BigDecimal amount;
        private BigDecimal percent;
    }
}
