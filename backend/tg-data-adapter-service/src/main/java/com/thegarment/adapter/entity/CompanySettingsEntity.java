package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("company_settings")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanySettingsEntity extends BaseEntity {

    @Column("company_name")
    private String companyName;

    @Column("working_day_per_month")
    private Integer workingDayPerMonth;

    @Column("working_hour_per_day")
    private Integer workingHourPerDay;

    @Column("check_attendance_type")
    private Integer checkAttendanceType;

    @Column("allow_check_before_payroll")
    private Integer allowCheckBeforePayroll;

    @Column("round_riel")
    private Integer roundRiel;

    @Column("attendance_allowance_type")
    private String attendanceAllowanceType;

    @Column("saturday_working")
    private Boolean saturdayWorking;

    @Column("saturday_hours")
    private Integer saturdayHours;

    @Column("set_holiday_by_group")
    private Boolean setHolidayByGroup;

    @Column("download_data_from")
    private String downloadDataFrom;

    @Column("cut_attendance")
    private Boolean cutAttendance;

    @Column("cut_prim")
    private Integer cutPrim;

    @Column("work_under_14_days")
    private Integer workUnder14Days;

    @Column("work_from_14_days_up")
    private Integer workFrom14DaysUp;
}
