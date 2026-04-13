package com.thegarment.bff.client;

import com.thegarment.bff.dto.UserResponse;
import com.thegarment.bff.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataAdapterClient {

    @Qualifier("dataAdapterWebClient")
    private final WebClient webClient;

    public Mono<UserResponse> getUserByUsername(String username) {
        return webClient.get()
                .uri("/api/v1/users/username/{username}", username)
                .retrieve()
                .onStatus(status -> status.value() == HttpStatus.NOT_FOUND.value(),
                        response -> Mono.error(new ResourceNotFoundException("User not found: " + username)))
                .bodyToMono(UserResponse.class)
                .doOnError(e -> log.error("Error fetching user {}: {}", username, e.getMessage()));
    }
}
