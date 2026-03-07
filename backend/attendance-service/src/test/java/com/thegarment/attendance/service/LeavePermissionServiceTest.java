package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.LeavePermission;
import com.thegarment.attendance.repository.LeavePermissionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeavePermissionServiceTest {

    @Mock
    private LeavePermissionRepository repository;

    @InjectMocks
    private LeavePermissionService leavePermissionService;

    private LeavePermission permission(Long id, String empCardNo) {
        LeavePermission lp = new LeavePermission();
        lp.setId(id);
        lp.setEmpCardNo(empCardNo);
        return lp;
    }

    @Test
    void search_returnsPage() {
        PageRequest pageable = PageRequest.of(0, 10);
        Page<LeavePermission> expected = new PageImpl<>(List.of(permission(1L, "E001")));
        when(repository.search("E001", null, null, pageable)).thenReturn(expected);

        Page<LeavePermission> result = leavePermissionService.search("E001", null, null, pageable);

        assertThat(result.getTotalElements()).isEqualTo(1);
    }

    @Test
    void search_withDateRange_delegatesToRepository() {
        LocalDate from = LocalDate.of(2026, 1, 1);
        LocalDate to = LocalDate.of(2026, 1, 31);
        PageRequest pageable = PageRequest.of(0, 20);
        when(repository.search(null, from, to, pageable))
                .thenReturn(new PageImpl<>(List.of()));

        leavePermissionService.search(null, from, to, pageable);

        verify(repository).search(null, from, to, pageable);
    }

    @Test
    void create_savesAndReturns() {
        LeavePermission input = permission(null, "E002");
        when(repository.save(input)).thenReturn(permission(5L, "E002"));

        LeavePermission result = leavePermissionService.create(input);

        assertThat(result.getId()).isEqualTo(5L);
    }

    @Test
    void update_setsIdAndSaves() {
        LeavePermission input = permission(null, "E003");
        when(repository.save(any())).thenReturn(permission(2L, "E003"));

        leavePermissionService.update(2L, input);

        assertThat(input.getId()).isEqualTo(2L);
        verify(repository).save(input);
    }

    @Test
    void delete_callsDeleteById() {
        leavePermissionService.delete(7L);

        verify(repository).deleteById(7L);
    }
}
