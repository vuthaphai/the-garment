package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.Controller;
import com.thegarment.attendance.repository.ControllerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ControllerService {

    private final ControllerRepository repository;

    public List<Controller> findAll() {
        return repository.findAllWithMachines();
    }

    public Controller create(Controller controller) {
        if (controller.getMachines() != null) {
            controller.getMachines().forEach(m -> m.setController(controller));
        }
        return repository.save(controller);
    }

    public Controller update(Long id, Controller controller) {
        Controller existing = repository.findByIdWithMachines(id)
                .orElseThrow(() -> new EntityNotFoundException("Controller not found: " + id));
        existing.setControllerName(controller.getControllerName());
        existing.getMachines().clear();
        if (controller.getMachines() != null) {
            controller.getMachines().forEach(m -> {
                m.setController(existing);
                existing.getMachines().add(m);
            });
        }
        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
