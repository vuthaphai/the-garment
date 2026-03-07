package com.thegarment.attendance.repository;

import com.thegarment.attendance.entity.AttendanceRaw;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AttendanceRawRepository extends JpaRepository<AttendanceRaw, Long> {
    List<AttendanceRaw> findByMachineIdAndScanDatetimeBetweenOrderByScanDatetime(
            Long machineId, LocalDateTime from, LocalDateTime to);

    boolean existsByEmpCardNoAndScanDatetime(String empCardNo, LocalDateTime scanDatetime);
}
