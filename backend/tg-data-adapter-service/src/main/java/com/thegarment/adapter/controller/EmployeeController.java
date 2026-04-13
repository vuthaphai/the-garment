package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.EmployeeRequest;
import com.thegarment.adapter.dto.response.EmployeeResponse;
import com.thegarment.adapter.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/page")
    public Mono<ResponseEntity<PageResponse<EmployeeResponse>>> findPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Boolean active) {
        return employeeService.findPage(page, size, active).map(ResponseEntity::ok);
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<EmployeeResponse>> findById(@PathVariable Long id) {
        return employeeService.findById(id).map(ResponseEntity::ok);
    }

    @GetMapping("/card/{empCardNo}")
    public Mono<ResponseEntity<EmployeeResponse>> findByEmpCardNo(@PathVariable String empCardNo) {
        return employeeService.findByEmpCardNo(empCardNo).map(ResponseEntity::ok);
    }

    @PostMapping
    public Mono<ResponseEntity<EmployeeResponse>> create(@Valid @RequestBody EmployeeRequest request) {
        return employeeService.create(request).map(r -> ResponseEntity.status(HttpStatus.CREATED).body(r));
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<EmployeeResponse>> update(@PathVariable Long id, @Valid @RequestBody EmployeeRequest request) {
        return employeeService.update(id, request).map(ResponseEntity::ok);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> delete(@PathVariable Long id) {
        return employeeService.delete(id).thenReturn(ResponseEntity.<Void>noContent().build());
    }
}
