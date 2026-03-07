package com.thegarment.hr.service;

import com.thegarment.hr.entity.Holiday;
import com.thegarment.hr.repository.HolidayRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HolidayServiceTest {

    @Mock
    private HolidayRepository repository;

    @InjectMocks
    private HolidayService holidayService;

    private Holiday holiday(Long id, int year) {
        Holiday h = new Holiday();
        h.setId(id);
        h.setYear(year);
        h.setHolidayDate(LocalDate.of(year, 1, 1));
        return h;
    }

    @Test
    void findByYear_returnsHolidaysForYear() {
        when(repository.findByYearOrderByHolidayDate(2026))
                .thenReturn(List.of(holiday(1L, 2026), holiday(2L, 2026)));

        List<Holiday> result = holidayService.findByYear(2026);

        assertThat(result).hasSize(2);
        verify(repository).findByYearOrderByHolidayDate(2026);
    }

    @Test
    void create_withoutYear_inferYearFromDate() {
        Holiday input = new Holiday();
        input.setHolidayDate(LocalDate.of(2026, 4, 17));
        // year not set — service must infer it

        Holiday saved = holiday(10L, 2026);
        when(repository.save(any())).thenReturn(saved);

        Holiday result = holidayService.create(input);

        assertThat(result.getYear()).isEqualTo(2026);
    }

    @Test
    void create_withYear_savesDirectly() {
        Holiday input = holiday(null, 2026);
        when(repository.save(any())).thenReturn(holiday(5L, 2026));

        Holiday result = holidayService.create(input);

        assertThat(result.getId()).isEqualTo(5L);
        verify(repository).save(any());
    }

    @Test
    void update_found_updatesAndReturns() {
        Holiday input = holiday(1L, 2026);
        when(repository.save(input)).thenReturn(input);

        Holiday result = holidayService.update(1L, input);

        assertThat(result).isNotNull();
        verify(repository).save(input);
    }

    @Test
    void delete_found_deletesSuccessfully() {
        doNothing().when(repository).deleteById(1L);

        holidayService.delete(1L);

        verify(repository).deleteById(1L);
    }
}
