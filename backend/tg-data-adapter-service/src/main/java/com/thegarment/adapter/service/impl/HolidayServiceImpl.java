package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.HolidayRequest;
import com.thegarment.adapter.dto.response.HolidayResponse;
import com.thegarment.adapter.entity.HolidayEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.HolidayRepository;
import com.thegarment.adapter.service.HolidayService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class HolidayServiceImpl implements HolidayService {

    private final HolidayRepository holidayRepository;

    @Override
    public Flux<HolidayResponse> findAll() {
        return holidayRepository.findAll(Sort.by("holidayDate")).map(this::toResponse);
    }

    @Override
    public Flux<HolidayResponse> findByYear(Integer year) {
        return holidayRepository.findByYear(year).map(this::toResponse);
    }

    @Override
    public Mono<HolidayResponse> findById(Long id) {
        return holidayRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Holiday", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<HolidayResponse> create(HolidayRequest request) {
        HolidayEntity entity = HolidayEntity.builder()
                .holidayDate(request.holidayDate())
                .nativeName(request.nativeName())
                .foreignName(request.foreignName())
                .description(request.description())
                .year(request.year())
                .createdAt(LocalDateTime.now())
                .build();
        return holidayRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<HolidayResponse> update(Long id, HolidayRequest request) {
        return holidayRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Holiday", id)))
                .flatMap(e -> {
                    e.setHolidayDate(request.holidayDate());
                    e.setNativeName(request.nativeName());
                    e.setForeignName(request.foreignName());
                    e.setDescription(request.description());
                    e.setYear(request.year());
                    return holidayRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return holidayRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Holiday", id)))
                .flatMap(holidayRepository::delete);
    }

    private HolidayResponse toResponse(HolidayEntity e) {
        return new HolidayResponse(
                e.getId(),
                e.getHolidayDate(),
                e.getNativeName(),
                e.getForeignName(),
                e.getDescription(),
                e.getYear(),
                e.getCreatedAt());
    }
}
