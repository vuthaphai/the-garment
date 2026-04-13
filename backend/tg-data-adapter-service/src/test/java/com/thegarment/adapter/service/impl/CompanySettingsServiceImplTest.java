package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.CompanySettingsRequest;
import com.thegarment.adapter.entity.CompanySettingsEntity;
import com.thegarment.adapter.repository.CompanySettingsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CompanySettingsServiceImplTest {

    @Mock
    private CompanySettingsRepository companySettingsRepository;

    private CompanySettingsServiceImpl companySettingsService;

    @BeforeEach
    void setUp() {
        companySettingsService = new CompanySettingsServiceImpl(companySettingsRepository);
    }

    @Test
    void findFirstShouldMapExistingSettings() {
        CompanySettingsEntity entity = CompanySettingsEntity.builder()
                .id(1L)
                .companyName("The Garment")
                .workingDayPerMonth(26)
                .workingHourPerDay(8)
                .createdAt(LocalDateTime.of(2026, 1, 1, 8, 0))
                .updatedAt(LocalDateTime.of(2026, 1, 2, 8, 0))
                .build();
        when(companySettingsRepository.findAll(any(Sort.class))).thenReturn(Flux.just(entity));

        StepVerifier.create(companySettingsService.findFirst())
                .expectNextMatches(response -> response.id().equals(1L)
                        && response.companyName().equals("The Garment")
                        && response.workingDayPerMonth().equals(26)
                        && response.workingHourPerDay().equals(8))
                .verifyComplete();
    }

    @Test
    void saveShouldCreateSettingsWhenNoneExist() {
        CompanySettingsRequest request = new CompanySettingsRequest(
                "The Garment",
                26,
                8,
                1,
                1,
                100,
                "FIXED",
                true,
                4,
                false,
                "DEVICE",
                true,
                2,
                14,
                15);

        CompanySettingsEntity saved = CompanySettingsEntity.builder()
                .id(2L)
                .companyName("The Garment")
                .workingDayPerMonth(26)
                .workingHourPerDay(8)
                .build();

        when(companySettingsRepository.findAll(any(Sort.class))).thenReturn(Flux.empty());
        when(companySettingsRepository.save(any(CompanySettingsEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(companySettingsService.save(request))
                .expectNextMatches(response -> response.id().equals(2L)
                        && response.companyName().equals("The Garment")
                        && response.workingDayPerMonth().equals(26))
                .verifyComplete();

        ArgumentCaptor<CompanySettingsEntity> captor = ArgumentCaptor.forClass(CompanySettingsEntity.class);
        verify(companySettingsRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getCreatedAt()).isNotNull();
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getAttendanceAllowanceType()).isEqualTo("FIXED");
    }

    @Test
    void saveShouldKeepExistingCreatedAtWhenSettingsAlreadyExist() {
        CompanySettingsRequest request = new CompanySettingsRequest(
                "The Garment Updated",
                27,
                8,
                2,
                1,
                200,
                "VARIABLE",
                false,
                0,
                true,
                "API",
                false,
                0,
                10,
                20);
        LocalDateTime createdAt = LocalDateTime.of(2026, 1, 5, 8, 0);
        CompanySettingsEntity existing = CompanySettingsEntity.builder()
                .id(8L)
                .companyName("Old Name")
                .createdAt(createdAt)
                .build();
        CompanySettingsEntity saved = CompanySettingsEntity.builder()
                .id(8L)
                .companyName("The Garment Updated")
                .workingDayPerMonth(27)
                .workingHourPerDay(8)
                .createdAt(createdAt)
                .build();

        when(companySettingsRepository.findAll(any(Sort.class))).thenReturn(Flux.just(existing));
        when(companySettingsRepository.save(any(CompanySettingsEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(companySettingsService.save(request))
                .expectNextMatches(response -> response.id().equals(8L)
                        && response.companyName().equals("The Garment Updated"))
                .verifyComplete();

        ArgumentCaptor<CompanySettingsEntity> captor = ArgumentCaptor.forClass(CompanySettingsEntity.class);
        verify(companySettingsRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getCreatedAt()).isEqualTo(createdAt);
    }
}
