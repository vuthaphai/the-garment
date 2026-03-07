package com.thegarment.attendance.repository;

import com.thegarment.attendance.entity.AttendanceDaily;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceDailyRepository extends JpaRepository<AttendanceDaily, Long> {

    @Query("""
        SELECT a FROM AttendanceDaily a
        WHERE (:empCardNo IS NULL OR a.empCardNo LIKE %:empCardNo%)
          AND (:dateFrom IS NULL OR a.scanDate >= :dateFrom)
          AND (:dateTo IS NULL OR a.scanDate <= :dateTo)
        ORDER BY a.scanDate DESC, a.empCardNo
        """)
    Page<AttendanceDaily> search(
            @Param("empCardNo") String empCardNo,
            @Param("dateFrom") LocalDate dateFrom,
            @Param("dateTo") LocalDate dateTo,
            Pageable pageable);

    List<AttendanceDaily> findByEmpCardNoAndScanDateBetween(
            String empCardNo, LocalDate from, LocalDate to);
}
