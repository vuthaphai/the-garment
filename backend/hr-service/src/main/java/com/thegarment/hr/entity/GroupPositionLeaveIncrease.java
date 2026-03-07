package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "group_position_leave_increase",
        uniqueConstraints = @UniqueConstraint(columnNames = {"group_position_id", "year"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class GroupPositionLeaveIncrease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_position_id", nullable = false)
    private GroupPosition groupPosition;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer days;
}
