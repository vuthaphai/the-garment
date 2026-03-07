package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.AttendanceRaw;
import com.thegarment.attendance.service.DownloadDataService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Download Data controller.
 * In production, this would connect to biometric SDK / SDK API.
 * For now, accepts manual upload of raw scan records.
 */
@RestController
@RequestMapping("/api/attendance/download")
@RequiredArgsConstructor
@Tag(name = "Download Data", description = "Download attendance data from biometric machines")
public class DownloadDataController {

    private final DownloadDataService downloadDataService;

    @PostMapping("/{controllerId}")
    @Operation(summary = "Import raw scan records for a controller's machines")
    public ResponseEntity<ApiResponse<String>> download(@PathVariable Long controllerId) {
        downloadDataService.initiateDownload(controllerId);
        return ResponseEntity.ok(ApiResponse.success("Download initiated for controller " + controllerId));
    }

    @PostMapping("/manual")
    @Operation(summary = "Manually upload raw scan records (for testing)")
    public ResponseEntity<ApiResponse<Integer>> uploadManual(
            @RequestBody List<AttendanceRaw> records) {
        int saved = downloadDataService.uploadManual(records);
        return ResponseEntity.ok(ApiResponse.success(
                saved + " new records saved (duplicates skipped)", saved));
    }
}
