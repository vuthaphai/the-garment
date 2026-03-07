package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.Shift;
import com.thegarment.attendance.repository.ShiftRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShiftService {

    private final ShiftRepository repository;

    public List<Shift> findAll(String search) {
        return (search == null || search.isBlank())
                ? repository.findAll()
                : repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase(search, search);
    }

    public Shift findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Shift not found: " + id));
    }

    public Shift create(Shift shift) {
        return repository.save(shift);
    }

    public Shift update(Long id, Shift shift) {
        shift.setId(id);
        return repository.save(shift);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
