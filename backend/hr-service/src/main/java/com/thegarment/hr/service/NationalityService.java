package com.thegarment.hr.service;

import com.thegarment.hr.dto.NationalityDto;
import com.thegarment.hr.dto.NationalityRequest;
import com.thegarment.hr.entity.Nationality;
import com.thegarment.hr.repository.NationalityRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NationalityService {

    private final NationalityRepository repository;

    public List<NationalityDto> findAll(String search) {
        List<Nationality> results = (search != null && !search.isBlank())
                ? repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase(search, search)
                : repository.findAllOrdered();
        return results.stream().map(this::toDto).collect(Collectors.toList());
    }

    public NationalityDto findById(Long id) {
        return toDto(repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nationality not found: " + id)));
    }

    @Transactional
    public NationalityDto create(NationalityRequest request) {
        Nationality entity = Nationality.builder()
                .nativeName(request.getNativeName())
                .foreignName(request.getForeignName())
                .description(request.getDescription())
                .build();
        return toDto(repository.save(entity));
    }

    @Transactional
    public NationalityDto update(Long id, NationalityRequest request) {
        Nationality entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nationality not found: " + id));
        entity.setNativeName(request.getNativeName());
        entity.setForeignName(request.getForeignName());
        entity.setDescription(request.getDescription());
        return toDto(repository.save(entity));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Nationality not found: " + id);
        }
        repository.deleteById(id);
    }

    private NationalityDto toDto(Nationality e) {
        return NationalityDto.builder()
                .id(e.getId())
                .nativeName(e.getNativeName())
                .foreignName(e.getForeignName())
                .description(e.getDescription())
                .build();
    }
}
