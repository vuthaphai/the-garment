package com.thegarment.hr.service;

import com.thegarment.hr.dto.PositionDto;
import com.thegarment.hr.dto.PositionRequest;
import com.thegarment.hr.entity.Position;
import com.thegarment.hr.repository.PositionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PositionServiceTest {

    @Mock
    private PositionRepository repository;

    @InjectMocks
    private PositionService positionService;

    private Position entity(Long id, String name) {
        return Position.builder().id(id).nativeName(name).foreignName(name + " EN").description("desc").build();
    }

    @Test
    void findAll_noSearch_returnsAll() {
        when(repository.findAllByOrderByNativeName()).thenReturn(List.of(entity(1L, "Manager")));

        List<PositionDto> result = positionService.findAll(null);

        assertThat(result).hasSize(1);
        verify(repository).findAllByOrderByNativeName();
    }

    @Test
    void findAll_withSearch_usesSearchQuery() {
        when(repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCaseOrderByNativeName("mgr",
                "mgr"))
                .thenReturn(List.of(entity(1L, "Manager")));

        positionService.findAll("mgr");

        verify(repository).findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCaseOrderByNativeName("mgr",
                "mgr");
    }

    @Test
    void create_validRequest_savesAndReturnsDto() {
        PositionRequest request = new PositionRequest();
        request.setNativeName("Director");
        request.setForeignName("Director EN");

        when(repository.save(any())).thenReturn(entity(10L, "Director"));

        PositionDto dto = positionService.create(request);

        assertThat(dto.getId()).isEqualTo(10L);
        verify(repository).save(any(Position.class));
    }

    @Test
    void update_found_updatesAndReturnsDto() {
        PositionRequest request = new PositionRequest();
        request.setNativeName("New Name");

        Position existing = entity(2L, "Old");
        when(repository.findById(2L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        PositionDto dto = positionService.update(2L, request);

        assertThat(dto).isNotNull();
        verify(repository).save(existing);
    }

    @Test
    void update_notFound_throwsEntityNotFoundException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> positionService.update(99L, new PositionRequest()))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void delete_found_deletesSuccessfully() {
        when(repository.existsById(1L)).thenReturn(true);

        positionService.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void delete_notFound_throwsEntityNotFoundException() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> positionService.delete(99L))
                .isInstanceOf(EntityNotFoundException.class);
    }
}
