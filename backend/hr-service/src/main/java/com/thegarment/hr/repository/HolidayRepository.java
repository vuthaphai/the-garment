package com.thegarment.hr.repository;

import com.thegarment.hr.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    List<Holiday> findByYearOrderByHolidayDate(Integer year);
}
