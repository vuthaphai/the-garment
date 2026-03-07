package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.LeavePermission;
import com.thegarment.attendance.repository.LeavePermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class LeavePermissionService {

    private final LeavePermissionRepository repository;

    public Page<LeavePermission> search(String empCardNo, LocalDate dateFrom, LocalDate dateTo, Pageable pageable) {
        return repository.search(empCardNo, dateFrom, dateTo, pageable);
    }

    public LeavePermission create(LeavePermission permission) {
        return repository.save(permission);
    }

    public LeavePermission update(Long id, LeavePermission permission) {
        permission.setId(id);
        return repository.save(permission);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
