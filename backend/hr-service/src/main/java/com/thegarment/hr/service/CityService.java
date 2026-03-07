package com.thegarment.hr.service;

import com.thegarment.hr.entity.City;
import com.thegarment.hr.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityService {

    private final CityRepository repository;

    public List<City> findAll(String search) {
        return (search == null || search.isBlank())
                ? repository.findAll()
                : repository.findByNativeNameContainingIgnoreCase(search);
    }
}
