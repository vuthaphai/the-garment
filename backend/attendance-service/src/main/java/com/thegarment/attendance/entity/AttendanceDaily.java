package com.thegarment.attendance.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "attendance_daily")
@Getter @Setter
public class AttendanceDaily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emp_card_no")
    private String empCardNo;

    @Column(name = "scan_date")
    private LocalDate scanDate;

    // Scan timestamps (up to 8 per day)
    private LocalTime t1, t2, t3, t4, t5, t6, t7, t8;

    @Column(name = "working_hours", precision = 5, scale = 2)
    private BigDecimal workingHours;

    @Column(name = "work_day_type")
    private String workDayType;

    @Column(name = "leave_hours", precision = 5, scale = 2)
    private BigDecimal leaveHours;

    @Column(name = "leave_type")
    private String leaveType;

    @Column(precision = 5, scale = 2)
    private BigDecimal ot1;

    @Column(precision = 5, scale = 2)
    private BigDecimal ot2;

    @Column(precision = 5, scale = 2)
    private BigDecimal ot3;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
