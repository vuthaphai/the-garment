package com.thegarment.bff.service;

import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;

public interface DataAdapterProxyService {
    Mono<ResponseEntity<String>> get(String pathAndQuery);

    Mono<ResponseEntity<String>> post(String pathAndQuery, Mono<String> requestBody);

    Mono<ResponseEntity<String>> put(String pathAndQuery, Mono<String> requestBody);

    Mono<ResponseEntity<String>> delete(String pathAndQuery);
}
