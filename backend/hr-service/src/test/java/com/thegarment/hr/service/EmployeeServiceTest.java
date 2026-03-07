package com.thegarment.hr.service;

import com.thegarment.hr.dto.EmployeeDto;
import com.thegarment.hr.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private NationalityRepository nationalityRepository;

    @Mock
    private CityRepository cityRepository;

    @Mock
    private GroupPositionRepository groupPositionRepository;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private PositionRepository positionRepository;

    @Mock
    private ContractTypeRepository contractTypeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void findById_notFound_throwsEntityNotFoundException() {
        when(employeeRepository.findByIdWithDetails(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> employeeService.findById(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void delete_found_deletesSuccessfully() {
        when(employeeRepository.existsById(1L)).thenReturn(true);

        employeeService.delete(1L);

        verify(employeeRepository).deleteById(1L);
    }

    @Test
    void delete_notFound_throwsEntityNotFoundException() {
        when(employeeRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> employeeService.delete(99L))
                .isInstanceOf(EntityNotFoundException.class);
        verify(employeeRepository, never()).deleteById(any());
    }
}
