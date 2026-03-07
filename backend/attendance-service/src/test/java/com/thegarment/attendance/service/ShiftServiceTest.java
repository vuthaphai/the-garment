package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.Shift;
import com.thegarment.attendance.repository.ShiftRepository;
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
class ShiftServiceTest {

    @Mock
    private ShiftRepository repository;

    @InjectMocks
    private ShiftService shiftService;

    private Shift shift(Long id, String name) {
        Shift s = new Shift();
        s.setId(id);
        s.setNativeName(name);
        return s;
    }

    @Test
    void findAll_noSearch_returnsAll() {
        when(repository.findAll()).thenReturn(List.of(shift(1L, "Morning"), shift(2L, "Night")));

        List<Shift> result = shiftService.findAll(null);

        assertThat(result).hasSize(2);
        verify(repository).findAll();
    }

    @Test
    void findAll_withSearch_usesSearchQuery() {
        when(repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase("morn", "morn"))
                .thenReturn(List.of(shift(1L, "Morning")));

        shiftService.findAll("morn");

        verify(repository).findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase("morn", "morn");
    }

    @Test
    void findById_found_returnsShift() {
        when(repository.findById(1L)).thenReturn(Optional.of(shift(1L, "Morning")));

        Shift result = shiftService.findById(1L);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getNativeName()).isEqualTo("Morning");
    }

    @Test
    void findById_notFound_throwsEntityNotFoundException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> shiftService.findById(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void create_savesAndReturnsShift() {
        Shift input = shift(null, "Evening");
        when(repository.save(input)).thenReturn(shift(10L, "Evening"));

        Shift result = shiftService.create(input);

        assertThat(result.getId()).isEqualTo(10L);
        verify(repository).save(input);
    }

    @Test
    void update_setsIdAndSaves() {
        Shift input = shift(null, "Updated");
        when(repository.save(any())).thenReturn(shift(3L, "Updated"));

        Shift result = shiftService.update(3L, input);

        assertThat(input.getId()).isEqualTo(3L);
        verify(repository).save(input);
    }

    @Test
    void delete_callsDeleteById() {
        shiftService.delete(1L);

        verify(repository).deleteById(1L);
    }
}
