package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "company_settings")
@Getter @Setter
public class CompanySettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "working_day_per_month")
    private Integer workingDayPerMonth = 26;

    @Column(name = "working_hour_per_day")
    private Integer workingHourPerDay = 8;

    @Column(name = "check_attendance_type")
    private Integer checkAttendanceType = 1;

    @Column(name = "allow_check_before_payroll")
    private Integer allowCheckBeforePayroll = 999;

    @Column(name = "round_riel")
    private Integer roundRiel = 0;

    @Column(name = "attendance_allowance_type")
    private String attendanceAllowanceType = "Month";

    @Column(name = "saturday_working")
    private Boolean saturdayWorking = true;

    @Column(name = "saturday_hours")
    private Integer saturdayHours = 8;

    @Column(name = "set_holiday_by_group")
    private Boolean setHolidayByGroup = false;

    @Column(name = "download_data_from")
    private String downloadDataFrom = "Machine";

    @Column(name = "cut_attendance")
    private Boolean cutAttendance = true;

    @Column(name = "cut_prim")
    private Integer cutPrim = 0;

    @Column(name = "work_under_14_days")
    private Integer workUnder14Days = 3;

    @Column(name = "work_from_14_days_up")
    private Integer workFrom14DaysUp = 6;
}
