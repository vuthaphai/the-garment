package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.Controller;
import com.thegarment.attendance.service.ControllerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance/controllers")
@RequiredArgsConstructor
@Tag(name = "Controller", description = "Biometric controller & machine management")
public class ControllerController {

    private final ControllerService controllerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Controller>>> findAll() {
        return ResponseEntity.ok(ApiResponse.success(controllerService.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Controller>> create(@RequestBody Controller controller) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", controllerService.create(controller)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Controller>> update(
            @PathVariable Long id, @RequestBody Controller controller) {
        return ResponseEntity.ok(ApiResponse.success("Updated", controllerService.update(id, controller)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        controllerService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
