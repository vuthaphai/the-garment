package com.thegarment.gateway.exception;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

/**
 * Global exception handler for the reactive (WebFlux) gateway.
 * Catches unhandled exceptions and returns a JSON error response.
 */
@Component
@Order(-1)
public class GlobalWebExceptionHandler implements WebExceptionHandler {

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        var response = exchange.getResponse();
        response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        String body = """
                {"success":false,"message":"Internal server error"}
                """.strip();

        var buffer = response.bufferFactory()
                .wrap(body.getBytes(StandardCharsets.UTF_8));

        return response.writeWith(Mono.just(buffer));
    }
}
