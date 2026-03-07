package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.LeavePermission;
import com.thegarment.attendance.repository.LeavePermissionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/attendance/permissions")
@RequiredArgsConstructor
@Tag(name = "Leave Permission", description = "Leave and permission management")
public class LeavePermissionController {

    private final LeavePermissionRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<LeavePermission>>> search(
            @RequestParam(required = false) String empCardNo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success(
                repository.search(empCardNo, dateFrom, dateTo, PageRequest.of(page, size))));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LeavePermission>> create(@RequestBody LeavePermission permission) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", repository.save(permission)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LeavePermission>> update(
            @PathVariable Long id, @RequestBody LeavePermission permission) {
        permission.setId(id);
        return ResponseEntity.ok(ApiResponse.success("Updated", repository.save(permission)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
