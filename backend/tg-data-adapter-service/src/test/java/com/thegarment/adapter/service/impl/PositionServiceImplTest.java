package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.PositionRequest;
import com.thegarment.adapter.entity.PositionEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.PositionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PositionServiceImplTest {

    @Mock
    private PositionRepository positionRepository;

    private PositionServiceImpl positionService;

    @BeforeEach
    void setUp() {
        positionService = new PositionServiceImpl(positionRepository);
    }

    @Test
    void createShouldPersistPosition() {
        PositionRequest request = new PositionRequest("Tailor", "Sewer", "Production line");
        PositionEntity saved = PositionEntity.builder()
                .id(2L)
                .nativeName("Tailor")
                .foreignName("Sewer")
                .description("Production line")
                .build();
        when(positionRepository.save(any(PositionEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(positionService.create(request))
                .expectNextMatches(response -> response.id().equals(2L)
                        && response.nativeName().equals("Tailor"))
                .verifyComplete();

        ArgumentCaptor<PositionEntity> captor = ArgumentCaptor.forClass(PositionEntity.class);
        verify(positionRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getCreatedAt()).isNotNull();
    }

    @Test
    void updateShouldFailWhenPositionDoesNotExist() {
        when(positionRepository.findById(99L)).thenReturn(Mono.empty());

        StepVerifier.create(positionService.update(99L, new PositionRequest("QA", "QA", "Quality")))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }

    @Test
    void deleteShouldRemoveExistingPosition() {
        PositionEntity existing = PositionEntity.builder().id(7L).nativeName("Cutting").build();
        when(positionRepository.findById(7L)).thenReturn(Mono.just(existing));
        when(positionRepository.delete(existing)).thenReturn(Mono.empty());

        StepVerifier.create(positionService.delete(7L)).verifyComplete();

        verify(positionRepository).delete(existing);
    }
}
