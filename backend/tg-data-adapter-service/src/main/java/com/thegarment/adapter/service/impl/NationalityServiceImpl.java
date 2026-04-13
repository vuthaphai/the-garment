package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.NationalityRequest;
import com.thegarment.adapter.dto.response.NationalityResponse;
import com.thegarment.adapter.entity.NationalityEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.NationalityRepository;
import com.thegarment.adapter.service.NationalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NationalityServiceImpl implements NationalityService {

    private final NationalityRepository nationalityRepository;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;

    @Override
    public Flux<NationalityResponse> findAll() {
        return nationalityRepository.findAll(Sort.by("id"))
                .map(this::toResponse);
    }

    @Override
    public Mono<NationalityResponse> findById(Long id) {
        return nationalityRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Nationality", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<NationalityResponse> create(NationalityRequest request) {
        NationalityEntity entity = NationalityEntity.builder()
                .nativeName(request.nativeName())
                .foreignName(request.foreignName())
                .description(request.description())
                .createdAt(LocalDateTime.now())
                .build();
        return nationalityRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<NationalityResponse> update(Long id, NationalityRequest request) {
        return nationalityRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Nationality", id)))
                .flatMap(entity -> {
                    entity.setNativeName(request.nativeName());
                    entity.setForeignName(request.foreignName());
                    entity.setDescription(request.description());
                    return nationalityRepository.save(entity);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return nationalityRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Nationality", id)))
                .flatMap(nationalityRepository::delete);
    }

    @Override
    public Mono<PageResponse<NationalityResponse>> findPage(int page, int size) {
        Mono<Long> countMono = r2dbcEntityTemplate.count(Query.empty(), NationalityEntity.class);
        Mono<List<NationalityResponse>> contentMono = r2dbcEntityTemplate
                .select(NationalityEntity.class)
                .matching(Query.empty().offset((long) page * size).limit(size))
                .all()
                .map(this::toResponse)
                .collectList();
        return Mono.zip(contentMono, countMono)
                .map(tuple -> PageResponse.of(tuple.getT1(), page, size, tuple.getT2()));
    }

    private NationalityResponse toResponse(NationalityEntity e) {
        return new NationalityResponse(e.getId(), e.getNativeName(), e.getForeignName(),
                e.getDescription(), e.getCreatedAt());
    }
}
