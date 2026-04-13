package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.response.ControllerResponse;
import com.thegarment.adapter.entity.ControllerEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.ControllerRepository;
import com.thegarment.adapter.service.ControllerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ControllerServiceImpl implements ControllerService {

    private final ControllerRepository controllerRepository;

    @Override
    public Flux<ControllerResponse> findAll() {
        return controllerRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<ControllerResponse> findById(Long id) {
        return controllerRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Controller", id)))
                .map(this::toResponse);
    }

    private ControllerResponse toResponse(ControllerEntity e) {
        return new ControllerResponse(e.getId(), e.getControllerName(), e.getCreatedAt());
    }
}
