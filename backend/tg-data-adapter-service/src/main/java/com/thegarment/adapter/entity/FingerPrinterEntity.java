package com.thegarment.adapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("finger_printers")
@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FingerPrinterEntity extends BaseEntity {

    @Column("finger_print_name")
    private String fingerPrintName;

    @Column("ip_address")
    private String ipAddress;

    @Column("port")
    private Integer port;
}