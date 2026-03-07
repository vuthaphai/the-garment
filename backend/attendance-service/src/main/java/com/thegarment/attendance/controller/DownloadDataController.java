package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.AttendanceRaw;
import com.thegarment.attendance.entity.Machine;
import com.thegarment.attendance.repository.AttendanceRawRepository;
import com.thegarment.attendance.repository.ControllerRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Download Data controller.
 * In production, this would connect to biometric SDK / SDK API.
 * For now, accepts manual upload of raw scan records.
 */
@Slf4j
@RestController
@RequestMapping("/api/attendance/download")
@RequiredArgsConstructor
@Tag(name = "Download Data", description = "Download attendance data from biometric machines")
public class DownloadDataController {

    private final ControllerRepository controllerRepository;
    private final AttendanceRawRepository rawRepository;

    @PostMapping("/{controllerId}")
    @Operation(summary = "Import raw scan records for a controller's machines")
    public ResponseEntity<ApiResponse<String>> download(@PathVariable Long controllerId) {
        controllerRepository.findByIdWithMachines(controllerId)
                .orElseThrow(() -> new EntityNotFoundException("Controller not found: " + controllerId));
        // In production: call SDK to pull data from machine over TCP
        // For demo, we return success without real hardware integration
        log.info("Download requested for controller {}", controllerId);
        return ResponseEntity.ok(ApiResponse.success("Download initiated for controller " + controllerId));
    }

    @PostMapping("/manual")
    @Operation(summary = "Manually upload raw scan records (for testing)")
    public ResponseEntity<ApiResponse<Integer>> uploadManual(
            @RequestBody List<AttendanceRaw> records) {
        int saved = 0;
        for (AttendanceRaw record : records) {
            if (!rawRepository.existsByEmpCardNoAndScanDatetime(
                    record.getEmpCardNo(), record.getScanDatetime())) {
                rawRepository.save(record);
                saved++;
            }
        }
        return ResponseEntity.ok(ApiResponse.success(
                saved + " new records saved (duplicates skipped)", saved));
    }
}
