package com.thegarment.bff.service.impl;

import com.thegarment.bff.client.DataAdapterClient;
import com.thegarment.bff.service.DataAdapterProxyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DataAdapterProxyServiceImpl implements DataAdapterProxyService {

    private final DataAdapterClient dataAdapterClient;

    @Override
    public Mono<ResponseEntity<String>> get(String pathAndQuery) {
        return dataAdapterClient.get(pathAndQuery);
    }

    @Override
    public Mono<ResponseEntity<String>> post(String pathAndQuery, Mono<String> requestBody) {
        return dataAdapterClient.post(pathAndQuery, requestBody);
    }

    @Override
    public Mono<ResponseEntity<String>> put(String pathAndQuery, Mono<String> requestBody) {
        return dataAdapterClient.put(pathAndQuery, requestBody);
    }

    @Override
    public Mono<ResponseEntity<String>> delete(String pathAndQuery) {
        return dataAdapterClient.delete(pathAndQuery);
    }
}
