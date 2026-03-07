package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.AttendanceDaily;
import com.thegarment.attendance.repository.AttendanceDailyRepository;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AttendanceDailyServiceTest {

    @Mock
    private AttendanceDailyRepository repository;

    @InjectMocks
    private AttendanceDailyService attendanceDailyService;

    @Test
    void search_delegatesToRepository() {
        PageRequest pageable = PageRequest.of(0, 50);
        AttendanceDaily record = new AttendanceDaily();
        record.setEmpCardNo("E001");
        Page<AttendanceDaily> expected = new PageImpl<>(List.of(record));

        when(repository.search("E001", null, null, pageable)).thenReturn(expected);

        Page<AttendanceDaily> result = attendanceDailyService.search("E001", null, null, pageable);

        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent().get(0).getEmpCardNo()).isEqualTo("E001");
    }

    @Test
    void search_withDateRange_passesParamsCorrectly() {
        LocalDate from = LocalDate.of(2026, 1, 1);
        LocalDate to = LocalDate.of(2026, 1, 31);
        PageRequest pageable = PageRequest.of(0, 20);
        when(repository.search(null, from, to, pageable))
                .thenReturn(new PageImpl<>(List.of()));

        attendanceDailyService.search(null, from, to, pageable);

        verify(repository).search(null, from, to, pageable);
    }
}
