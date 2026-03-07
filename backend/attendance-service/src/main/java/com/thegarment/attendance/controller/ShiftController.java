package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.Shift;
import com.thegarment.attendance.repository.ShiftRepository;
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

    private final ShiftRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Shift>>> findAll(
            @RequestParam(required = false) String search) {
        List<Shift> result = (search == null || search.isBlank())
                ? repository.findAll()
                : repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase(
                        search, search);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Shift>> findById(@PathVariable Long id) {
        return repository.findById(id)
                .map(s -> ResponseEntity.ok(ApiResponse.success(s)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Shift>> create(@RequestBody Shift shift) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", repository.save(shift)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Shift>> update(@PathVariable Long id, @RequestBody Shift shift) {
        shift.setId(id);
        return ResponseEntity.ok(ApiResponse.success("Updated", repository.save(shift)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
