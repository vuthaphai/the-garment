package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.Controller;
import com.thegarment.attendance.repository.ControllerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ControllerServiceTest {

    @Mock
    private ControllerRepository repository;

    @InjectMocks
    private ControllerService controllerService;

    private Controller controller(Long id, String name) {
        Controller c = new Controller();
        c.setId(id);
        c.setControllerName(name);
        c.setMachines(new ArrayList<>());
        return c;
    }

    @Test
    void findAll_delegatesToRepository() {
        when(repository.findAllWithMachines())
                .thenReturn(List.of(controller(1L, "Main Gate"), controller(2L, "Back Door")));

        List<Controller> result = controllerService.findAll();

        assertThat(result).hasSize(2);
        verify(repository).findAllWithMachines();
    }

    @Test
    void create_withoutMachines_savesDirectly() {
        Controller input = controller(null, "Factory");
        when(repository.save(input)).thenReturn(controller(1L, "Factory"));

        Controller result = controllerService.create(input);

        assertThat(result.getId()).isEqualTo(1L);
        verify(repository).save(input);
    }

    @Test
    void update_found_updatesNameAndSaves() {
        Controller existing = controller(1L, "Old Name");
        Controller input = controller(null, "New Name");
        when(repository.findByIdWithMachines(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        Controller result = controllerService.update(1L, input);

        assertThat(result.getControllerName()).isEqualTo("New Name");
        verify(repository).save(existing);
    }

    @Test
    void update_notFound_throwsEntityNotFoundException() {
        when(repository.findByIdWithMachines(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> controllerService.update(99L, controller(null, "Any")))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void delete_callsDeleteById() {
        controllerService.delete(5L);

        verify(repository).deleteById(5L);
    }
}
