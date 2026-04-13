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

@Table("nationalities")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NationalityEntity {

    @Id
    private Long id;

    @Column("native_name")
    private String nativeName;

    @Column("foreign_name")
    private String foreignName;

    @Column("description")
    private String description;

    @CreatedDate
    @Column("created_at")
    private LocalDateTime createdAt;
}
