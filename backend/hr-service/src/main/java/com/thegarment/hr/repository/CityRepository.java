package com.thegarment.hr.repository;

import com.thegarment.hr.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findAllByOrderByNativeName();
    List<City> findByNativeNameContainingIgnoreCase(String name);
}
