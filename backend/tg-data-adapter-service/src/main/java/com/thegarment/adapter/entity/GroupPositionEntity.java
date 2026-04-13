package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table("group_positions")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupPositionEntity extends BaseEntity {

    @Column("native_name")
    private String nativeName;

    @Column("foreign_name")
    private String foreignName;

    @Column("description")
    private String description;

    @Column("ot1")
    private Boolean ot1;

    @Column("ot2")
    private Boolean ot2;

    @Column("ot3")
    private Boolean ot3;

    @Column("pay_for_ot1_food")
    private Boolean payForOt1Food;

    @Column("pay_for_ot2_food")
    private Boolean payForOt2Food;

    @Column("pay_for_ot3_food")
    private Boolean payForOt3Food;

    @Column("pay_for_saturday")
    private Boolean payForSaturday;

    @Column("pay_for_sunday")
    private Boolean payForSunday;

    @Column("pay_for_holiday")
    private Boolean payForHoliday;

    @Column("shift_allowance")
    private Boolean shiftAllowance;

    @Column("never_absence")
    private Boolean neverAbsence;

    @Column("allow_ot_half_hour")
    private Boolean allowOtHalfHour;

    @Column("attendance_allowance")
    private BigDecimal attendanceAllowance;

    @Column("go_home_percent")
    private BigDecimal goHomePercent;

    @Column("pregnant_day_allowed")
    private Integer pregnantDayAllowed;

    @Column("end_contract_percent")
    private BigDecimal endContractPercent;

    @Column("pregnant_rate")
    private BigDecimal pregnantRate;

    @Column("annual_leave_day_allowed")
    private Integer annualLeaveDayAllowed;
}
