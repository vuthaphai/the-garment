package com.thegarment.hr.service;

import com.thegarment.hr.entity.CompanySettings;
import com.thegarment.hr.repository.CompanySettingsRepository;
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
class CompanySettingsServiceTest {

    @Mock
    private CompanySettingsRepository repository;

    @InjectMocks
    private CompanySettingsService companySettingsService;

    @Test
    void get_settingsExist_returnsExistingSettings() {
        CompanySettings existing = new CompanySettings();
        existing.setId(1L);
        when(repository.findAll()).thenReturn(List.of(existing));

        CompanySettings result = companySettingsService.get();

        assertThat(result.getId()).isEqualTo(1L);
        verify(repository, never()).save(any());
    }

    @Test
    void get_noSettings_createsAndReturnsNew() {
        CompanySettings created = new CompanySettings();
        created.setId(1L);
        when(repository.findAll()).thenReturn(List.of());
        when(repository.save(any())).thenReturn(created);

        CompanySettings result = companySettingsService.get();

        assertThat(result.getId()).isEqualTo(1L);
        verify(repository).save(any(CompanySettings.class));
    }

    @Test
    void update_settingsExist_updatesWithExistingId() {
        CompanySettings existing = new CompanySettings();
        existing.setId(5L);
        CompanySettings input = new CompanySettings();

        when(repository.findAll()).thenReturn(List.of(existing));
        when(repository.save(input)).thenReturn(input);

        CompanySettings result = companySettingsService.update(input);

        // Input should have received the existing id
        assertThat(input.getId()).isEqualTo(5L);
        verify(repository).save(input);
    }

    @Test
    void update_noExistingSettings_createsNew() {
        CompanySettings input = new CompanySettings();
        when(repository.findAll()).thenReturn(List.of());
        when(repository.save(input)).thenReturn(input);

        companySettingsService.update(input);

        verify(repository).save(input);
    }
}
