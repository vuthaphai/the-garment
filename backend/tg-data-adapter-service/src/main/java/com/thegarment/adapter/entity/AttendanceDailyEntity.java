package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Table("attendance_daily")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDailyEntity extends BaseEntity {

    @Column("emp_card_no")
    private String empCardNo;

    @Column("scan_date")
    private LocalDate scanDate;

    @Column("t1")
    private LocalTime t1;

    @Column("t2")
    private LocalTime t2;

    @Column("t3")
    private LocalTime t3;

    @Column("t4")
    private LocalTime t4;

    @Column("t5")
    private LocalTime t5;

    @Column("t6")
    private LocalTime t6;

    @Column("t7")
    private LocalTime t7;

    @Column("t8")
    private LocalTime t8;

    @Column("working_hours")
    private BigDecimal workingHours;

    @Column("work_day_type")
    private String workDayType;

    @Column("leave_hours")
    private BigDecimal leaveHours;

    @Column("leave_type")
    private String leaveType;

    @Column("ot1")
    private BigDecimal ot1;

    @Column("ot2")
    private BigDecimal ot2;

    @Column("ot3")
    private BigDecimal ot3;
}
