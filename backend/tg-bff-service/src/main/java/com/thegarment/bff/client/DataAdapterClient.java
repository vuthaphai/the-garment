package com.thegarment.bff.client;

import com.thegarment.bff.dto.AuthUserResponse;
import com.thegarment.bff.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataAdapterClient {

    @Qualifier("dataAdapterWebClient")
    private final WebClient webClient;

    public Mono<ResponseEntity<String>> get(String pathAndQuery) {
        return exchange(HttpMethod.GET, pathAndQuery, Mono.empty());
    }

    public Mono<ResponseEntity<String>> post(String pathAndQuery, Mono<String> requestBody) {
        return exchange(HttpMethod.POST, pathAndQuery, requestBody);
    }

    public Mono<ResponseEntity<String>> put(String pathAndQuery, Mono<String> requestBody) {
        return exchange(HttpMethod.PUT, pathAndQuery, requestBody);
    }

    public Mono<ResponseEntity<String>> delete(String pathAndQuery) {
        return exchange(HttpMethod.DELETE, pathAndQuery, Mono.empty());
    }

    public Mono<AuthUserResponse> getUserByUsername(String username) {
        return webClient.get()
                .uri("/api/v1/users/auth/{username}", username)
                .retrieve()
                .onStatus(status -> status.value() == HttpStatus.NOT_FOUND.value(),
                        response -> Mono.error(new ResourceNotFoundException("User not found: " + username)))
                .bodyToMono(AuthUserResponse.class)
                .doOnError(e -> log.error("Error fetching user {}: {}", username, e.getMessage()));
    }

    private Mono<ResponseEntity<String>> exchange(HttpMethod method, String pathAndQuery,
            Mono<String> requestBody) {
        WebClient.RequestBodySpec request = webClient.method(method)
                .uri(pathAndQuery);

        WebClient.RequestHeadersSpec<?> requestSpec = requiresBody(method)
                ? request.contentType(MediaType.APPLICATION_JSON)
                        .body(requestBody.defaultIfEmpty(""), String.class)
                : request;

        return requestSpec.exchangeToMono(response -> response.toEntity(String.class))
                .doOnError(e -> log.error("Error forwarding {} {}: {}", method, pathAndQuery,
                        e.getMessage()));
    }

    private boolean requiresBody(HttpMethod method) {
        return HttpMethod.POST.equals(method) || HttpMethod.PUT.equals(method)
                || HttpMethod.PATCH.equals(method);
    }
}
