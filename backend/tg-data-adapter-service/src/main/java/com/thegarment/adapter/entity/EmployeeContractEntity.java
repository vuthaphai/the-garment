package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Table("employee_contracts")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeContractEntity {

    @Id
    private Long id;

    @Column("employee_id")
    private Long employeeId;

    @Column("contract_type_id")
    private Long contractTypeId;

    @Column("from_date")
    private LocalDate fromDate;

    @Column("to_date")
    private LocalDate toDate;

    @Column("months")
    private Integer months;

    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;
}
