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

@Table("employees")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeEntity extends BaseEntity {

    @Column("emp_card_no")
    private String empCardNo;

    @Column("serial_card_no")
    private String serialCardNo;

    @Column("native_name")
    private String nativeName;

    @Column("foreign_name")
    private String foreignName;

    @Column("date_of_birth")
    private LocalDate dateOfBirth;

    @Column("nationality_id")
    private Long nationalityId;

    @Column("sex")
    private String sex;

    @Column("social_security")
    private String socialSecurity;

    @Column("election_card")
    private String electionCard;

    @Column("place_of_birth")
    private String placeOfBirth;

    @Column("city_id")
    private Long cityId;

    @Column("marital_status")
    private String maritalStatus;

    @Column("spouse_name")
    private String spouseName;

    @Column("children_count")
    private Integer childrenCount;

    @Column("email")
    private String email;

    @Column("current_address")
    private String currentAddress;

    @Column("description")
    private String description;

    @Column("tel")
    private String tel;

    @Column("driver_license")
    private String driverLicense;

    @Column("health_check_up")
    private Boolean healthCheckUp;

    @Column("work_book")
    private Boolean workBook;

    @Column("finger_print")
    private Integer fingerPrint;

    @Column("family_list_num")
    private String familyListNum;

    @Column("anl_old_used")
    private Integer anlOldUsed;

    @Column("group_position_id")
    private Long groupPositionId;

    @Column("group_id")
    private Long groupId;

    @Column("position_id")
    private Long positionId;

    @Column("date_joined")
    private LocalDate dateJoined;

    @Column("date_resigned")
    private LocalDate dateResigned;

    @Column("payment_type")
    private String paymentType;

    @Column("currency")
    private String currency;

    @Column("salary")
    private BigDecimal salary;

    @Column("photo_path")
    private String photoPath;

    @Column("active")
    private Boolean active;
}
