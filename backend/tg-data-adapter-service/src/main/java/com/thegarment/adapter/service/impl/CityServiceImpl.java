package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.CityRequest;
import com.thegarment.adapter.dto.response.CityResponse;
import com.thegarment.adapter.entity.CityEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.CityRepository;
import com.thegarment.adapter.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    @Override
    public Flux<CityResponse> findAll() {
        return cityRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<CityResponse> findById(Long id) {
        return cityRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("City", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<CityResponse> create(CityRequest request) {
        CityEntity entity = CityEntity.builder()
                .nativeName(request.nativeName())
                .foreignName(request.foreignName())
                .createdAt(LocalDateTime.now())
                .build();
        return cityRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<CityResponse> update(Long id, CityRequest request) {
        return cityRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("City", id)))
                .flatMap(e -> {
                    e.setNativeName(request.nativeName());
                    e.setForeignName(request.foreignName());
                    return cityRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return cityRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("City", id)))
                .flatMap(cityRepository::delete);
    }

    private CityResponse toResponse(CityEntity e) {
        return new CityResponse(e.getId(), e.getNativeName(), e.getForeignName(), e.getCreatedAt());
    }
}
