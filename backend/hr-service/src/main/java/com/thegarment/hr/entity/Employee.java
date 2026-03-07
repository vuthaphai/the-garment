package com.thegarment.hr.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "employees")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "emp_card_no", unique = true, nullable = false, length = 50)
    private String empCardNo;

    @Column(name = "serial_card_no", length = 50)
    private String serialCardNo;

    @Column(name = "native_name", length = 100)
    private String nativeName;

    @Column(name = "foreign_name", length = 100)
    private String foreignName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nationality_id")
    private Nationality nationality;

    @Column(length = 1)
    private String sex = "F";

    @Column(name = "social_security", length = 50)
    private String socialSecurity;

    @Column(name = "election_card", length = 50)
    private String electionCard;

    @Column(name = "place_of_birth", length = 255)
    private String placeOfBirth;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private City city;

    @Column(name = "marital_status", length = 20)
    private String maritalStatus;

    @Column(name = "spouse_name", length = 100)
    private String spouseName;

    @Column(name = "children_count")
    private Integer childrenCount = 0;

    @Column(length = 100)
    private String email;

    @Column(name = "current_address", columnDefinition = "TEXT")
    private String currentAddress;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 20)
    private String tel;

    @Column(name = "driver_license", length = 50)
    private String driverLicense;

    @Column(name = "health_check_up")
    private Boolean healthCheckUp = false;

    @Column(name = "work_book")
    private Boolean workBook = false;

    @Column(name = "finger_print")
    private Integer fingerPrint = 0;

    @Column(name = "family_list_num", length = 50)
    private String familyListNum;

    @Column(name = "anl_old_used")
    private Integer anlOldUsed = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_position_id")
    private GroupPosition groupPosition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private Position position;

    @Column(name = "date_joined")
    private LocalDate dateJoined;

    @Column(name = "date_resigned")
    private LocalDate dateResigned;

    @Column(name = "payment_type", length = 20)
    private String paymentType = "Month";

    @Column(length = 10)
    private String currency = "$";

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "photo_path", length = 500)
    private String photoPath;

    @Column(nullable = false)
    private Boolean active = true;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<EmployeeContract> contracts = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }
}
