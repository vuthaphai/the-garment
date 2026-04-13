package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.CityRequest;
import com.thegarment.adapter.entity.CityEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CityServiceImplTest {

    @Mock
    private CityRepository cityRepository;

    private CityServiceImpl cityService;

    @BeforeEach
    void setUp() {
        cityService = new CityServiceImpl(cityRepository);
    }

    @Test
    void createShouldPersistAndMapResponse() {
        CityEntity saved = CityEntity.builder()
                .id(10L)
                .nativeName("Phnom Penh")
                .foreignName("Phnom Penh")
                .createdAt(LocalDateTime.of(2026, 1, 1, 8, 0))
                .build();
        when(cityRepository.save(any(CityEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(cityService.create(new CityRequest("Phnom Penh", "Phnom Penh")))
                .expectNextMatches(response -> response.id().equals(10L)
                        && response.nativeName().equals("Phnom Penh")
                        && response.foreignName().equals("Phnom Penh"))
                .verifyComplete();

        ArgumentCaptor<CityEntity> captor = ArgumentCaptor.forClass(CityEntity.class);
        verify(cityRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getCreatedAt()).isNotNull();
    }

    @Test
    void updateShouldFailWhenCityDoesNotExist() {
        when(cityRepository.findById(99L)).thenReturn(Mono.empty());

        StepVerifier.create(cityService.update(99L, new CityRequest("A", "B")))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }

    @Test
    void deleteShouldRemoveExistingCity() {
        CityEntity existing = CityEntity.builder().id(4L).nativeName("Kampot").build();
        when(cityRepository.findById(4L)).thenReturn(Mono.just(existing));
        when(cityRepository.delete(existing)).thenReturn(Mono.empty());

        StepVerifier.create(cityService.delete(4L)).verifyComplete();

        verify(cityRepository).delete(existing);
    }
}
