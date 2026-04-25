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
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Tag(name = "Finger Printer", description = "BFF endpoints for finger printer machine management")
public class FingerPrinterController {

    private static final String READ_ROLES = "hasAnyRole('ADMIN','HR','USER')";
    private static final String WRITE_ROLES = "hasAnyRole('ADMIN','HR')";

    private final DataAdapterProxyService dataAdapterProxyService;

    @GetMapping("/api/v1/finger-printers")
    @Operation(summary = "List finger printers")
    @PreAuthorize(READ_ROLES)
    public Mono<ResponseEntity<String>> list() {
        return dataAdapterProxyService.get("/api/v1/finger-printers");
    }

    @GetMapping("/api/v1/finger-printers/{id}")
    @Operation(summary = "Get finger printer")
    @PreAuthorize(READ_ROLES)
    public Mono<ResponseEntity<String>> getById(@PathVariable Long id) {
        return dataAdapterProxyService.get("/api/v1/finger-printers/" + id);
    }

    @PostMapping("/api/v1/finger-printers")
    @Operation(summary = "Create finger printer")
    @PreAuthorize(WRITE_ROLES)
    public Mono<ResponseEntity<String>> create(@RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.post("/api/v1/finger-printers", requestBody);
    }

    @PutMapping("/api/v1/finger-printers/{id}")
    @Operation(summary = "Update finger printer")
    @PreAuthorize(WRITE_ROLES)
    public Mono<ResponseEntity<String>> update(@PathVariable Long id,
            @RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.put("/api/v1/finger-printers/" + id, requestBody);
    }

    @DeleteMapping("/api/v1/finger-printers/{id}")
    @Operation(summary = "Delete finger printer")
    @PreAuthorize(WRITE_ROLES)
    public Mono<ResponseEntity<String>> delete(@PathVariable Long id) {
        return dataAdapterProxyService.delete("/api/v1/finger-printers/" + id);
    }
}