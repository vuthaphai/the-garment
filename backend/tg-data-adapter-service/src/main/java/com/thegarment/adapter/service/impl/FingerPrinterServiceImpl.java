package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.FingerPrinterRequest;
import com.thegarment.adapter.dto.response.FingerPrinterResponse;
import com.thegarment.adapter.entity.FingerPrinterEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.FingerPrinterRepository;
import com.thegarment.adapter.service.FingerPrinterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class FingerPrinterServiceImpl implements FingerPrinterService {

    private final FingerPrinterRepository fingerPrinterRepository;

    @Override
    public Flux<FingerPrinterResponse> findAll() {
        return fingerPrinterRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<FingerPrinterResponse> findById(Long id) {
        return fingerPrinterRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("FingerPrinter", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<FingerPrinterResponse> create(FingerPrinterRequest request) {
        FingerPrinterEntity entity = FingerPrinterEntity.builder()
                .fingerPrintName(request.fingerPrintName())
                .ipAddress(request.ip())
                .port(request.port() == null ? 4370 : request.port())
                .build();
        return fingerPrinterRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<FingerPrinterResponse> update(Long id, FingerPrinterRequest request) {
        return fingerPrinterRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("FingerPrinter", id)))
                .flatMap(existing -> {
                    existing.setFingerPrintName(request.fingerPrintName());
                    existing.setIpAddress(request.ip());
                    existing.setPort(request.port() == null ? 4370 : request.port());
                    return fingerPrinterRepository.save(existing);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return fingerPrinterRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("FingerPrinter", id)))
                .flatMap(existing -> fingerPrinterRepository.deleteById(existing.getId()));
    }

    private FingerPrinterResponse toResponse(FingerPrinterEntity entity) {
        return new FingerPrinterResponse(
                entity.getId(),
                entity.getFingerPrintName(),
                entity.getIpAddress(),
                entity.getPort(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}