package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.City;
import com.thegarment.hr.service.CityService;
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

    private final CityService cityService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<City>>> findAll(
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(cityService.findAll(search)));
    }
}
