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

import java.time.LocalDateTime;

@Table("contract_types")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContractTypeEntity {

    @Id
    private Long id;

    @Column("contract_name")
    private String contractName;

    @Column("auto_rule")
    private String autoRule;

    @Column("is_auto")
    private Boolean isAuto;

    @Column("duration")
    private Integer duration;

    @Column("warning")
    private Integer warning;

    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;
}
