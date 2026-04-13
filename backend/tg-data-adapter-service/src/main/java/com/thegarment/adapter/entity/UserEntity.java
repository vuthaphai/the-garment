package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("users")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity {

    @Column("username")
    private String username;

    @Column("password")
    private String password;

    @Column("full_name")
    private String fullName;

    @Column("role")
    private String role;

    @Column("language")
    private String language;

    @Column("active")
    private Boolean active;
}
