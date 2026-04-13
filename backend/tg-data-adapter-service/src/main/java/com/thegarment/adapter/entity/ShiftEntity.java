package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalTime;

@Table("shifts")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShiftEntity extends BaseEntity {

    @Column("native_name")
    private String nativeName;

    @Column("foreign_name")
    private String foreignName;

    @Column("authorization_before")
    private Integer authorizationBefore;

    @Column("authorization_after")
    private Integer authorizationAfter;

    @Column("shift_type")
    private String shiftType;

    @Column("first_start")
    private LocalTime firstStart;

    @Column("first_end")
    private LocalTime firstEnd;

    @Column("second_start")
    private LocalTime secondStart;

    @Column("second_end")
    private LocalTime secondEnd;

    @Column("ot1_start")
    private LocalTime ot1Start;

    @Column("ot1_end")
    private LocalTime ot1End;

    @Column("ot2_start")
    private LocalTime ot2Start;

    @Column("ot2_end")
    private LocalTime ot2End;

    @Column("ot3_start")
    private LocalTime ot3Start;

    @Column("ot3_end")
    private LocalTime ot3End;

    @Column("ot1_rate")
    private BigDecimal ot1Rate;

    @Column("ot2_rate")
    private BigDecimal ot2Rate;

    @Column("ot3_rate")
    private BigDecimal ot3Rate;

    @Column("saturday_rate")
    private BigDecimal saturdayRate;

    @Column("sunday_rate")
    private BigDecimal sundayRate;

    @Column("holiday_rate")
    private BigDecimal holidayRate;

    @Column("shift_bonus")
    private BigDecimal shiftBonus;

    @Column("food_allowance_ot1")
    private BigDecimal foodAllowanceOt1;

    @Column("food_allowance_ot2_slot1")
    private BigDecimal foodAllowanceOt2Slot1;

    @Column("food_allowance_ot2_slot2")
    private BigDecimal foodAllowanceOt2Slot2;

    @Column("food_allowance_ot3")
    private BigDecimal foodAllowanceOt3;
}
