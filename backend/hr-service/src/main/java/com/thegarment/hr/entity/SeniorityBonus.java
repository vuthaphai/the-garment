package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "seniority_bonus",
        uniqueConstraints = @UniqueConstraint(columnNames = {"group_position_id", "year"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SeniorityBonus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_position_id", nullable = false)
    private GroupPosition groupPosition;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, precision = 5, scale = 2)
    private BigDecimal percent;
}
