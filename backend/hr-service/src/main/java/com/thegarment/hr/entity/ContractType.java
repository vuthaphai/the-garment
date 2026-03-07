package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "contract_types")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ContractType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contract_name", nullable = false, length = 100)
    private String contractName;

    @Column(name = "auto_rule", length = 100)
    private String autoRule;

    @Column(name = "is_auto", nullable = false)
    private Boolean isAuto = false;

    @Column
    private Integer duration;

    @Column
    private Integer warning;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
