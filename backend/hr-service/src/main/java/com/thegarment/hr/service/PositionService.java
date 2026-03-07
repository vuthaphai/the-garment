package com.thegarment.hr.service;

import com.thegarment.hr.dto.PositionDto;
import com.thegarment.hr.dto.PositionRequest;
import com.thegarment.hr.entity.Position;
import com.thegarment.hr.repository.PositionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PositionService {

    private final PositionRepository repository;

    public List<PositionDto> findAll(String search) {
        List<Position> results = (search != null && !search.isBlank())
                ? repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCaseOrderByNativeName(search, search)
                : repository.findAllByOrderByNativeName();
        return results.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public PositionDto create(PositionRequest request) {
        Position entity = Position.builder()
                .nativeName(request.getNativeName())
                .foreignName(request.getForeignName())
                .description(request.getDescription())
                .build();
        return toDto(repository.save(entity));
    }

    @Transactional
    public PositionDto update(Long id, PositionRequest request) {
        Position entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Position not found: " + id));
        entity.setNativeName(request.getNativeName());
        entity.setForeignName(request.getForeignName());
        entity.setDescription(request.getDescription());
        return toDto(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) throw new EntityNotFoundException("Position not found: " + id);
        repository.deleteById(id);
    }

    private PositionDto toDto(Position e) {
        return PositionDto.builder()
                .id(e.getId()).nativeName(e.getNativeName())
                .foreignName(e.getForeignName()).description(e.getDescription())
                .build();
    }
}
