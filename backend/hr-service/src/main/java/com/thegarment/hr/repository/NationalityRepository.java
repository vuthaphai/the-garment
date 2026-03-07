package com.thegarment.hr.repository;

import com.thegarment.hr.entity.Nationality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NationalityRepository extends JpaRepository<Nationality, Long> {
    @Query("SELECT n FROM Nationality n ORDER BY n.nativeName")
    List<Nationality> findAllOrdered();
    List<Nationality> findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase(
            String nativeName, String foreignName);
}
