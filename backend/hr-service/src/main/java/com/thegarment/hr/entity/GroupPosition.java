package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "group_positions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GroupPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "native_name", nullable = false, length = 100)
    private String nativeName;

    @Column(name = "foreign_name", length = 100)
    private String foreignName;

    @Column(columnDefinition = "TEXT")
    private String description;

    // OT eligibility
    @Column(name = "ot1", nullable = false) private Boolean ot1 = false;
    @Column(name = "ot2", nullable = false) private Boolean ot2 = false;
    @Column(name = "ot3", nullable = false) private Boolean ot3 = false;
    @Column(name = "pay_for_ot1_food", nullable = false) private Boolean payForOt1Food = false;
    @Column(name = "pay_for_ot2_food", nullable = false) private Boolean payForOt2Food = false;
    @Column(name = "pay_for_ot3_food", nullable = false) private Boolean payForOt3Food = false;

    // Day type flags
    @Column(name = "pay_for_saturday", nullable = false) private Boolean payForSaturday = false;
    @Column(name = "pay_for_sunday", nullable = false) private Boolean payForSunday = false;
    @Column(name = "pay_for_holiday", nullable = false) private Boolean payForHoliday = false;

    // Allowance flags
    @Column(name = "shift_allowance", nullable = false) private Boolean shiftAllowance = false;
    @Column(name = "never_absence", nullable = false) private Boolean neverAbsence = false;
    @Column(name = "allow_ot_half_hour", nullable = false) private Boolean allowOtHalfHour = false;

    // Numeric values
    @Column(name = "attendance_allowance", nullable = false, precision = 10, scale = 2)
    private BigDecimal attendanceAllowance = BigDecimal.ZERO;

    @Column(name = "go_home_percent", nullable = false, precision = 5, scale = 2)
    private BigDecimal goHomePercent = BigDecimal.ZERO;

    @Column(name = "pregnant_day_allowed", nullable = false)
    private Integer pregnantDayAllowed = 0;

    @Column(name = "end_contract_percent", nullable = false, precision = 5, scale = 2)
    private BigDecimal endContractPercent = BigDecimal.ZERO;

    @Column(name = "pregnant_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal pregnantRate = BigDecimal.ZERO;

    @Column(name = "annual_leave_day_allowed", nullable = false)
    private Integer annualLeaveDayAllowed = 0;

    // Child collections
    @OneToMany(mappedBy = "groupPosition", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<GroupPositionLeaveIncrease> leaveIncreases = new ArrayList<>();

    @OneToMany(mappedBy = "groupPosition", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<SeniorityBonus> seniorityBonuses = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
