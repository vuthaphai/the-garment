package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.Holiday;
import com.thegarment.hr.service.HolidayService;
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

    private final HolidayService holidayService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Holiday>>> findByYear(
            @RequestParam @NotNull Integer year) {
        return ResponseEntity.ok(ApiResponse.success(holidayService.findByYear(year)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Holiday>> create(@Valid @RequestBody Holiday holiday) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", holidayService.create(holiday)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Holiday>> update(
            @PathVariable Long id, @Valid @RequestBody Holiday holiday) {
        return ResponseEntity.ok(ApiResponse.success("Updated", holidayService.update(id, holiday)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        holidayService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
