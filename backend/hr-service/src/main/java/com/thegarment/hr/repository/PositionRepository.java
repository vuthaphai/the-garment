package com.thegarment.hr.repository;

import com.thegarment.hr.entity.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PositionRepository extends JpaRepository<Position, Long> {
    List<Position> findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCaseOrderByNativeName(
            String nativeName, String foreignName);
    List<Position> findAllByOrderByNativeName();
}
