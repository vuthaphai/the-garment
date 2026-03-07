package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.Shift;
import com.thegarment.attendance.service.ShiftService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance/shifts")
@RequiredArgsConstructor
@Tag(name = "Shift", description = "Shift management")
public class ShiftController {

    private final ShiftService shiftService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Shift>>> findAll(
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(ApiResponse.success(shiftService.findAll(search)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Shift>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(shiftService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Shift>> create(@RequestBody Shift shift) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", shiftService.create(shift)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Shift>> update(@PathVariable Long id, @RequestBody Shift shift) {
        return ResponseEntity.ok(ApiResponse.success("Updated", shiftService.update(id, shift)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        shiftService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
