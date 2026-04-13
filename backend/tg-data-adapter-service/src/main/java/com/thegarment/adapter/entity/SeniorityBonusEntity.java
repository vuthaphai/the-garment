package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.math.BigDecimal;

@Table("seniority_bonus")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeniorityBonusEntity {

    @Id
    private Long id;

    @Column("group_position_id")
    private Long groupPositionId;

    @Column("year")
    private Integer year;

    @Column("amount")
    private BigDecimal amount;

    @Column("percent")
    private BigDecimal percent;
}
