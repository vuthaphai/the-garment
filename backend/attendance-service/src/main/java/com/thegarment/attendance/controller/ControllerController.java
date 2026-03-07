package com.thegarment.attendance.controller;

import com.thegarment.attendance.dto.ApiResponse;
import com.thegarment.attendance.entity.Controller;
import com.thegarment.attendance.entity.Machine;
import com.thegarment.attendance.repository.ControllerRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
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

    private final ControllerRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Controller>>> findAll() {
        return ResponseEntity.ok(ApiResponse.success(repository.findAllWithMachines()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Controller>> create(@RequestBody Controller controller) {
        if (controller.getMachines() != null) {
            controller.getMachines().forEach(m -> m.setController(controller));
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Created", repository.save(controller)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Controller>> update(
            @PathVariable Long id, @RequestBody Controller controller) {
        Controller existing = repository.findByIdWithMachines(id)
                .orElseThrow(() -> new EntityNotFoundException("Controller not found: " + id));
        existing.setControllerName(controller.getControllerName());
        existing.getMachines().clear();
        if (controller.getMachines() != null) {
            controller.getMachines().forEach(m -> {
                m.setController(existing);
                existing.getMachines().add(m);
            });
        }
        return ResponseEntity.ok(ApiResponse.success("Updated", repository.save(existing)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Deleted", null));
    }
}
