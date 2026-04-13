package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.PositionRequest;
import com.thegarment.adapter.dto.response.PositionResponse;
import com.thegarment.adapter.entity.PositionEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.PositionRepository;
import com.thegarment.adapter.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PositionServiceImpl implements PositionService {

    private final PositionRepository positionRepository;

    @Override
    public Flux<PositionResponse> findAll() {
        return positionRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<PositionResponse> findById(Long id) {
        return positionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Position", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<PositionResponse> create(PositionRequest request) {
        PositionEntity entity = PositionEntity.builder()
                .nativeName(request.nativeName()).foreignName(request.foreignName())
                .description(request.description()).createdAt(LocalDateTime.now()).build();
        return positionRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<PositionResponse> update(Long id, PositionRequest request) {
        return positionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Position", id)))
                .flatMap(e -> {
                    e.setNativeName(request.nativeName());
                    e.setForeignName(request.foreignName());
                    e.setDescription(request.description());
                    return positionRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return positionRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Position", id)))
                .flatMap(positionRepository::delete);
    }

    private PositionResponse toResponse(PositionEntity e) {
        return new PositionResponse(e.getId(), e.getNativeName(), e.getForeignName(), e.getDescription(), e.getCreatedAt());
    }
}
