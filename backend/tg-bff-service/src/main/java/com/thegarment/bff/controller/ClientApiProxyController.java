package com.thegarment.bff.controller;

import com.thegarment.bff.service.DataAdapterProxyService;
import io.swagger.v3.oas.annotations.Hidden;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Hidden
@Deprecated(since = "1.1", forRemoval = false)
@RestController
@RequiredArgsConstructor
public class ClientApiProxyController {

    private final DataAdapterProxyService dataAdapterProxyService;

    @GetMapping({
            "/api/v1/attendance-daily/page",
            "/api/v1/cities",
            "/api/v1/cities/{id}",
            "/api/v1/contract-types",
            "/api/v1/contract-types/{id}",
            "/api/v1/employees/page",
            "/api/v1/employees/card/{empCardNo}",
            "/api/v1/group-positions",
            "/api/v1/group-positions/page",
            "/api/v1/group-positions/{id}",
            "/api/v1/groups",
            "/api/v1/groups/{id}",
            "/api/v1/holidays",
            "/api/v1/holidays/year/{year}",
            "/api/v1/holidays/{id}",
            "/api/v1/leave-permissions/page",
            "/api/v1/leave-permissions/{id}",
            "/api/v1/nationalities",
            "/api/v1/nationalities/page",
            "/api/v1/nationalities/{id}",
            "/api/v1/positions",
            "/api/v1/positions/{id}",
            "/api/v1/shifts",
            "/api/v1/shifts/{id}",
            "/api/v1/users/username/{username}"
    })
    @PreAuthorize("hasAnyRole('ADMIN','HR','USER','ACCOUNTING')")
    public Mono<ResponseEntity<String>> proxyGet(ServerWebExchange exchange) {
        return dataAdapterProxyService.get(getPathAndQuery(exchange));
    }

    @PostMapping({
            "/api/v1/cities",
            "/api/v1/contract-types",
            "/api/v1/group-positions",
            "/api/v1/groups",
            "/api/v1/holidays",
            "/api/v1/leave-permissions",
            "/api/v1/nationalities",
            "/api/v1/positions",
            "/api/v1/shifts"
    })
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public Mono<ResponseEntity<String>> proxyPost(ServerWebExchange exchange,
            @RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.post(getPathAndQuery(exchange), requestBody);
    }

    @PutMapping({
            "/api/v1/cities/{id}",
            "/api/v1/contract-types/{id}",
            "/api/v1/group-positions/{id}",
            "/api/v1/groups/{id}",
            "/api/v1/holidays/{id}",
            "/api/v1/leave-permissions/{id}",
            "/api/v1/nationalities/{id}",
            "/api/v1/positions/{id}",
            "/api/v1/shifts/{id}"
    })
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public Mono<ResponseEntity<String>> proxyPut(ServerWebExchange exchange,
            @RequestBody(required = false) Mono<String> requestBody) {
        return dataAdapterProxyService.put(getPathAndQuery(exchange), requestBody);
    }

    @DeleteMapping({
            "/api/v1/cities/{id}",
            "/api/v1/contract-types/{id}",
            "/api/v1/group-positions/{id}",
            "/api/v1/groups/{id}",
            "/api/v1/holidays/{id}",
            "/api/v1/leave-permissions/{id}",
            "/api/v1/nationalities/{id}",
            "/api/v1/positions/{id}",
            "/api/v1/shifts/{id}"
    })
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public Mono<ResponseEntity<String>> proxyDelete(ServerWebExchange exchange) {
        return dataAdapterProxyService.delete(getPathAndQuery(exchange));
    }

    private String getPathAndQuery(ServerWebExchange exchange) {
        String rawPath = exchange.getRequest().getURI().getRawPath();
        String rawQuery = exchange.getRequest().getURI().getRawQuery();
        return rawQuery == null || rawQuery.isBlank() ? rawPath : rawPath + "?" + rawQuery;
    }
}
