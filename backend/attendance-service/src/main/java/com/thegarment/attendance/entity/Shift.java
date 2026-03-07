package com.thegarment.attendance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "shifts")
@Getter @Setter
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "native_name", nullable = false)
    private String nativeName;

    @Column(name = "foreign_name")
    private String foreignName;

    @Column(name = "authorization_before")
    private Integer authorizationBefore = 0;

    @Column(name = "authorization_after")
    private Integer authorizationAfter = 0;

    @Column(name = "shift_type")
    private String shiftType = "IN_ONCE";

    // First work period
    @Column(name = "first_start")
    private LocalTime firstStart;

    @Column(name = "first_end")
    private LocalTime firstEnd;

    // Second work period
    @Column(name = "second_start")
    private LocalTime secondStart;

    @Column(name = "second_end")
    private LocalTime secondEnd;

    // OT periods
    @Column(name = "ot1_start")
    private LocalTime ot1Start;

    @Column(name = "ot1_end")
    private LocalTime ot1End;

    @Column(name = "ot2_start")
    private LocalTime ot2Start;

    @Column(name = "ot2_end")
    private LocalTime ot2End;

    @Column(name = "ot3_start")
    private LocalTime ot3Start;

    @Column(name = "ot3_end")
    private LocalTime ot3End;

    // Rates (%)
    @Column(name = "ot1_rate", precision = 5, scale = 2)
    private BigDecimal ot1Rate = new BigDecimal("150");

    @Column(name = "ot2_rate", precision = 5, scale = 2)
    private BigDecimal ot2Rate = new BigDecimal("150");

    @Column(name = "ot3_rate", precision = 5, scale = 2)
    private BigDecimal ot3Rate = BigDecimal.ZERO;

    @Column(name = "saturday_rate", precision = 5, scale = 2)
    private BigDecimal saturdayRate = BigDecimal.ZERO;

    @Column(name = "sunday_rate", precision = 5, scale = 2)
    private BigDecimal sundayRate = new BigDecimal("200");

    @Column(name = "holiday_rate", precision = 5, scale = 2)
    private BigDecimal holidayRate = new BigDecimal("200");

    @Column(name = "shift_bonus", precision = 5, scale = 2)
    private BigDecimal shiftBonus = BigDecimal.ZERO;

    // Food allowances
    @Column(name = "food_allowance_ot1", precision = 10, scale = 2)
    private BigDecimal foodAllowanceOt1 = BigDecimal.ZERO;

    @Column(name = "food_allowance_ot2_18_2030", precision = 10, scale = 2)
    private BigDecimal foodAllowanceOt2_18_2030 = BigDecimal.ZERO;

    @Column(name = "food_allowance_ot2_2030_22", precision = 10, scale = 2)
    private BigDecimal foodAllowanceOt2_2030_22 = BigDecimal.ZERO;

    @Column(name = "food_allowance_ot3", precision = 10, scale = 2)
    private BigDecimal foodAllowanceOt3 = BigDecimal.ZERO;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
