package com.thegarment.attendance.repository;

import com.thegarment.attendance.entity.Controller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ControllerRepository extends JpaRepository<Controller, Long> {
    @Query("SELECT c FROM Controller c LEFT JOIN FETCH c.machines")
    List<Controller> findAllWithMachines();

    @Query("SELECT c FROM Controller c LEFT JOIN FETCH c.machines WHERE c.id = :id")
    Optional<Controller> findByIdWithMachines(Long id);
}
