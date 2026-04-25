package com.thegarment.bff.controller;

import com.thegarment.bff.service.DataAdapterProxyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Tag(name = "Employee", description = "BFF endpoints for employee operations")
public class EmployeeController {

    private static final String READ_EMPLOYEE_ROLES = "hasAnyRole('ADMIN','HR','USER','ACCOUNTING')";
    private static final String EMPLOYEE_WRITE_ROLES = "hasAnyRole('ADMIN','HR')";

    private final DataAdapterProxyService dataAdapterProxyService;

    @GetMapping("/api/v1/employees")
    @Operation(summary = "List employees", description = "Employee listing for authorized users")
    @PreAuthorize(READ_EMPLOYEE_ROLES)
    public Mono<ResponseEntity<String>> listEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return dataAdapterProxyService.get("/api/v1/employees/page?page=" + page + "&size=" + size);
    }

    @GetMapping("/api/v1/employees/{id}")
    @Operation(summary = "Get employee detail", description = "Employee detail lookup")
    @PreAuthorize(READ_EMPLOYEE_ROLES)
    public Mono<ResponseEntity<String>> getEmployeeById(@PathVariable Long id) {
        return dataAdapterProxyService.get("/api/v1/employees/" + id);
    }

    @PostMapping("/api/v1/employees")
    @Operation(summary = "Create employee", description = "HR/Admin can create employee records")
    @PreAuthorize(EMPLOYEE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> createEmployee(@RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.post("/api/v1/employees", requestBody);
    }

    @PutMapping("/api/v1/employees/{id}")
    @Operation(summary = "Update employee", description = "HR/Admin can update employee records")
    @PreAuthorize(EMPLOYEE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> updateEmployee(@PathVariable Long id,
            @RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.put("/api/v1/employees/" + id, requestBody);
    }

    @DeleteMapping("/api/v1/employees/{id}")
    @Operation(summary = "Delete employee", description = "HR/Admin can remove employee records")
    @PreAuthorize(EMPLOYEE_WRITE_ROLES)
    public Mono<ResponseEntity<String>> deleteEmployee(@PathVariable Long id) {
        return dataAdapterProxyService.delete("/api/v1/employees/" + id);
    }

    @GetMapping("/api/v1/users/{username}")
    @Operation(summary = "Get user by username", description = "Lookup user profile by username")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public Mono<ResponseEntity<String>> getUserByUsername(@PathVariable String username) {
        return dataAdapterProxyService.get("/api/v1/users/username/" + username);
    }
}
