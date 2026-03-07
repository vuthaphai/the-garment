package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.AttendanceDaily;
import com.thegarment.attendance.repository.AttendanceDailyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AttendanceDailyService {

    private final AttendanceDailyRepository repository;

    public Page<AttendanceDaily> search(String empCardNo, LocalDate dateFrom, LocalDate dateTo, Pageable pageable) {
        return repository.search(empCardNo, dateFrom, dateTo, pageable);
    }
}
