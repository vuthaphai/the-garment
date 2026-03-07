package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.City;
import com.thegarment.hr.repository.CityRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/cities")
@RequiredArgsConstructor
@Tag(name = "City", description = "City lookup")
public class CityController {

    private final CityRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<City>>> findAll(
            @RequestParam(required = false) String search) {
        List<City> result = (search == null || search.isBlank())
                ? repository.findAll()
                : repository.findByNativeNameContainingIgnoreCase(search);
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
