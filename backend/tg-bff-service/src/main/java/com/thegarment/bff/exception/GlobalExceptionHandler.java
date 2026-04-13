package com.thegarment.bff.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.support.WebExchangeBindException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public Mono<ResponseEntity<ErrorResponse>> handleNotFound(ResourceNotFoundException ex,
            ServerWebExchange exchange) {
        log.warn("Resource not found: {}", ex.getMessage());
        return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse.of(404, "Not Found", ex.getMessage(),
                        exchange.getRequest().getPath().value())));
    }

    @ExceptionHandler(BusinessException.class)
    public Mono<ResponseEntity<ErrorResponse>> handleBusiness(BusinessException ex,
            ServerWebExchange exchange) {
        return Mono.just(ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorResponse.of(409, "Conflict", ex.getMessage(),
                        exchange.getRequest().getPath().value())));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public Mono<ResponseEntity<ErrorResponse>> handleBadCredentials(BadCredentialsException ex,
            ServerWebExchange exchange) {
        return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.of(401, "Unauthorized", "Invalid username or password",
                        exchange.getRequest().getPath().value())));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public Mono<ResponseEntity<ErrorResponse>> handleAccessDenied(AccessDeniedException ex,
            ServerWebExchange exchange) {
        return Mono.just(ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse.of(403, "Forbidden", "Access denied",
                        exchange.getRequest().getPath().value())));
    }

    @ExceptionHandler(WebExchangeBindException.class)
    public Mono<ResponseEntity<ErrorResponse>> handleValidation(WebExchangeBindException ex,
            ServerWebExchange exchange) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
                .reduce("", (a, b) -> a.isEmpty() ? b : a + "; " + b);
        return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.of(400, "Bad Request", message,
                        exchange.getRequest().getPath().value())));
    }

    @ExceptionHandler(Exception.class)
    public Mono<ResponseEntity<ErrorResponse>> handleGeneral(Exception ex,
            ServerWebExchange exchange) {
        log.error("Unexpected error: {}", ex.getMessage(), ex);
        return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.of(500, "Internal Server Error", "An unexpected error occurred",
                        exchange.getRequest().getPath().value())));
    }
}
