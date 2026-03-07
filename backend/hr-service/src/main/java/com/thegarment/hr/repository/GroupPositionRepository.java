package com.thegarment.hr.repository;

import com.thegarment.hr.entity.GroupPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GroupPositionRepository extends JpaRepository<GroupPosition, Long> {
    @Query("SELECT gp FROM GroupPosition gp LEFT JOIN FETCH gp.leaveIncreases LEFT JOIN FETCH gp.seniorityBonuses ORDER BY gp.nativeName")
    List<GroupPosition> findAllWithDetails();

    @Query("SELECT gp FROM GroupPosition gp LEFT JOIN FETCH gp.leaveIncreases LEFT JOIN FETCH gp.seniorityBonuses WHERE gp.id = :id")
    Optional<GroupPosition> findByIdWithDetails(Long id);
}
