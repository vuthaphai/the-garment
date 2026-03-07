package com.thegarment.hr.service;

import com.thegarment.hr.dto.GroupPositionDto;
import com.thegarment.hr.repository.GroupPositionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GroupPositionServiceTest {

    @Mock
    private GroupPositionRepository repository;

    @InjectMocks
    private GroupPositionService groupPositionService;

    @Test
    void findAll_emptyRepository_returnsEmptyList() {
        when(repository.findAllWithDetails()).thenReturn(List.of());

        List<GroupPositionDto> result = groupPositionService.findAll();

        assertThat(result).isEmpty();
        verify(repository).findAllWithDetails();
    }

    @Test
    void findById_notFound_throwsEntityNotFoundException() {
        when(repository.findByIdWithDetails(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> groupPositionService.findById(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void update_notFound_throwsEntityNotFoundException() {
        when(repository.findByIdWithDetails(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> groupPositionService.update(99L, null))
                .isInstanceOf(EntityNotFoundException.class);
    }
}
