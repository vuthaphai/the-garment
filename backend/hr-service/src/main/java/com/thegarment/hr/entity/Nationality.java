package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "nationalities")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Nationality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "native_name", nullable = false, length = 100)
    private String nativeName;

    @Column(name = "foreign_name", length = 100)
    private String foreignName;

    @Column(length = 255)
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}
