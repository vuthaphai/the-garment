package com.thegarment.hr.service;

import com.thegarment.hr.entity.City;
import com.thegarment.hr.repository.CityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CityServiceTest {

    @Mock
    private CityRepository repository;

    @InjectMocks
    private CityService cityService;

    @Test
    void findAll_noSearch_returnsAllCities() {
        City city = new City();
        city.setNativeName("Phnom Penh");
        when(repository.findAll()).thenReturn(List.of(city));

        List<City> result = cityService.findAll(null);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNativeName()).isEqualTo("Phnom Penh");
        verify(repository).findAll();
    }

    @Test
    void findAll_emptySearch_returnsAllCities() {
        when(repository.findAll()).thenReturn(List.of());

        cityService.findAll("  ");

        verify(repository).findAll();
    }

    @Test
    void findAll_withSearch_usesSearchQuery() {
        City city = new City();
        city.setNativeName("Siem Reap");
        when(repository.findByNativeNameContainingIgnoreCase("siem"))
                .thenReturn(List.of(city));

        List<City> result = cityService.findAll("siem");

        assertThat(result).hasSize(1);
        verify(repository).findByNativeNameContainingIgnoreCase("siem");
    }
}
