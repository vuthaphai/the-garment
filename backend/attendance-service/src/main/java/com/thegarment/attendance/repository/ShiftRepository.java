package com.thegarment.attendance.repository;

import com.thegarment.attendance.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase(
            String nativeName, String foreignName);
}
