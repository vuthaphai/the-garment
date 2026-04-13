package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.ContractTypeRequest;
import com.thegarment.adapter.entity.ContractTypeEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.ContractTypeRepository;
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
class ContractTypeServiceImplTest {

    @Mock
    private ContractTypeRepository contractTypeRepository;

    private ContractTypeServiceImpl contractTypeService;

    @BeforeEach
    void setUp() {
        contractTypeService = new ContractTypeServiceImpl(contractTypeRepository);
    }

    @Test
    void createShouldPersistAndMapResponse() {
        ContractTypeRequest request = new ContractTypeRequest("Fixed", "AUTO", true, 12, 30);
        ContractTypeEntity saved = ContractTypeEntity.builder()
                .id(3L)
                .contractName("Fixed")
                .autoRule("AUTO")
                .isAuto(true)
                .duration(12)
                .warning(30)
                .createdAt(LocalDateTime.of(2026, 1, 1, 8, 0))
                .build();
        when(contractTypeRepository.save(any(ContractTypeEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(contractTypeService.create(request))
                .expectNextMatches(response -> response.id().equals(3L)
                        && response.contractName().equals("Fixed")
                        && response.isAuto())
                .verifyComplete();

        ArgumentCaptor<ContractTypeEntity> captor = ArgumentCaptor.forClass(ContractTypeEntity.class);
        verify(contractTypeRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getCreatedAt()).isNotNull();
    }

    @Test
    void updateShouldFailWhenContractTypeDoesNotExist() {
        when(contractTypeRepository.findById(9L)).thenReturn(Mono.empty());

        StepVerifier.create(contractTypeService.update(9L, new ContractTypeRequest("A", "B", false, 6, 7)))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }

    @Test
    void deleteShouldRemoveExistingContractType() {
        ContractTypeEntity existing = ContractTypeEntity.builder().id(5L).contractName("Probation").build();
        when(contractTypeRepository.findById(5L)).thenReturn(Mono.just(existing));
        when(contractTypeRepository.delete(existing)).thenReturn(Mono.empty());

        StepVerifier.create(contractTypeService.delete(5L)).verifyComplete();

        verify(contractTypeRepository).delete(existing);
    }
}
