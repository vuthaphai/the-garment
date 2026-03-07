package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.Holiday;
import com.thegarment.hr.repository.HolidayRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings/holidays")
@RequiredArgsConstructor
@Tag(name = "Holidays", description = "Holiday calendar management")
public class HolidayController {

    private final HolidayRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Holiday>>> findByYear(
            @RequestParam @NotNull Integer year) {
        return ResponseEntity.ok(ApiResponse.success(
                repository.findByYearOrderByHolidayDate(year)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Holiday>> create(@Valid @RequestBody Holiday holiday) {
        if (holiday.getYear() == null && holiday.getHolidayDate() != null) {
            holiday.setYear(holiday.getHolidayDate().getYear());
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", repository.save(holiday)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Holiday>> update(
            @PathVariable Long id, @Valid @RequestBody Holiday holiday) {
        holiday.setId(id);
        return ResponseEntity.ok(ApiResponse.success("Updated", repository.save(holiday)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
