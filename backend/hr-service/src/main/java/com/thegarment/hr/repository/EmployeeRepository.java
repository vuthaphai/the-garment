package com.thegarment.hr.repository;

import com.thegarment.hr.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmpCardNo(String empCardNo);

    @Query("""
            SELECT e FROM Employee e
            LEFT JOIN FETCH e.nationality
            LEFT JOIN FETCH e.position
            LEFT JOIN FETCH e.groupPosition
            LEFT JOIN FETCH e.group
            LEFT JOIN FETCH e.city
            WHERE e.id = :id
            """)
    Optional<Employee> findByIdWithDetails(@Param("id") Long id);

    @Query("""
            SELECT e FROM Employee e
            WHERE (:search IS NULL OR e.empCardNo LIKE %:search%
                OR e.nativeName LIKE %:search%
                OR e.foreignName LIKE %:search%)
            AND (:active IS NULL OR e.active = :active)
            """)
    Page<Employee> search(
            @Param("search") String search,
            @Param("active") Boolean active,
            Pageable pageable);
}
