package com.thegarment.hr.service;

import com.thegarment.hr.dto.ContractTypeDto;
import com.thegarment.hr.dto.ContractTypeRequest;
import com.thegarment.hr.entity.ContractType;
import com.thegarment.hr.repository.ContractTypeRepository;
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
class ContractTypeServiceTest {

    @Mock
    private ContractTypeRepository repository;

    @InjectMocks
    private ContractTypeService contractTypeService;

    private ContractType entity(Long id, String name) {
        return ContractType.builder()
                .id(id).contractName(name).autoRule("MONTHLY")
                .isAuto(false).duration(12).warning(30)
                .build();
    }

    @Test
    void findAll_returnsAllContractTypes() {
        when(repository.findAllByOrderByContractName())
                .thenReturn(List.of(entity(1L, "Permanent"), entity(2L, "Probation")));

        List<ContractTypeDto> result = contractTypeService.findAll();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getContractName()).isEqualTo("Permanent");
    }

    @Test
    void create_validRequest_savesAndReturnsDto() {
        ContractTypeRequest request = new ContractTypeRequest();
        request.setContractName("Fixed Term");
        request.setAutoRule("YEARLY");
        request.setIsAuto(true);
        request.setDuration(24);
        request.setWarning(60);

        when(repository.save(any())).thenReturn(entity(3L, "Fixed Term"));

        ContractTypeDto dto = contractTypeService.create(request);

        assertThat(dto.getId()).isEqualTo(3L);
        assertThat(dto.getContractName()).isEqualTo("Fixed Term");
        verify(repository).save(any(ContractType.class));
    }

    @Test
    void update_found_updatesAndReturnsDto() {
        ContractTypeRequest request = new ContractTypeRequest();
        request.setContractName("Updated");
        request.setAutoRule("MONTHLY");
        request.setIsAuto(false);
        request.setDuration(6);
        request.setWarning(14);

        ContractType existing = entity(1L, "Old");
        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        ContractTypeDto dto = contractTypeService.update(1L, request);

        assertThat(dto).isNotNull();
        verify(repository).save(existing);
    }

    @Test
    void update_notFound_throwsEntityNotFoundException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> contractTypeService.update(99L, new ContractTypeRequest()))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void delete_found_deletesSuccessfully() {
        when(repository.existsById(1L)).thenReturn(true);

        contractTypeService.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void delete_notFound_throwsEntityNotFoundException() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> contractTypeService.delete(99L))
                .isInstanceOf(EntityNotFoundException.class);
    }
}
