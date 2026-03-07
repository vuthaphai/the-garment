package com.thegarment.attendance.repository;

import com.thegarment.attendance.entity.LeavePermission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface LeavePermissionRepository extends JpaRepository<LeavePermission, Long> {

    @Query("""
        SELECT l FROM LeavePermission l
        WHERE (:empCardNo IS NULL OR l.empCardNo LIKE %:empCardNo%)
          AND (:dateFrom IS NULL OR l.fromDate >= :dateFrom)
          AND (:dateTo IS NULL OR l.toDate <= :dateTo)
        ORDER BY l.fromDate DESC
        """)
    Page<LeavePermission> search(
            @Param("empCardNo") String empCardNo,
            @Param("dateFrom") LocalDate dateFrom,
            @Param("dateTo") LocalDate dateTo,
            Pageable pageable);
}
