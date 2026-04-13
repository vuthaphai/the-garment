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

@Table("leave_permissions")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LeavePermissionEntity extends BaseEntity {

    @Column("emp_card_no")
    private String empCardNo;

    @Column("permission_type")
    private String permissionType;

    @Column("from_date")
    private LocalDate fromDate;

    @Column("to_date")
    private LocalDate toDate;

    @Column("description")
    private String description;

    @Column("leave_hours")
    private BigDecimal leaveHours;
}
