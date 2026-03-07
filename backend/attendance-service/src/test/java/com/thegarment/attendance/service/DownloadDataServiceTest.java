package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.AttendanceRaw;
import com.thegarment.attendance.entity.Controller;
import com.thegarment.attendance.repository.AttendanceRawRepository;
import com.thegarment.attendance.repository.ControllerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DownloadDataServiceTest {

    @Mock
    private ControllerRepository controllerRepository;

    @Mock
    private AttendanceRawRepository rawRepository;

    @InjectMocks
    private DownloadDataService downloadDataService;

    @Test
    void initiateDownload_controllerExists_logsAndReturns() {
        Controller controller = new Controller();
        controller.setId(1L);
        controller.setMachines(new ArrayList<>());
        when(controllerRepository.findByIdWithMachines(1L)).thenReturn(Optional.of(controller));

        // Should not throw
        assertThatCode(() -> downloadDataService.initiateDownload(1L)).doesNotThrowAnyException();
    }

    @Test
    void initiateDownload_controllerNotFound_throwsEntityNotFoundException() {
        when(controllerRepository.findByIdWithMachines(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> downloadDataService.initiateDownload(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void uploadManual_noDuplicates_savesAll() {
        AttendanceRaw r1 = raw("E001", LocalDateTime.of(2026, 1, 10, 8, 0));
        AttendanceRaw r2 = raw("E002", LocalDateTime.of(2026, 1, 10, 8, 5));

        when(rawRepository.existsByEmpCardNoAndScanDatetime(any(), any())).thenReturn(false);
        when(rawRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        int saved = downloadDataService.uploadManual(List.of(r1, r2));

        assertThat(saved).isEqualTo(2);
        verify(rawRepository, times(2)).save(any());
    }

    @Test
    void uploadManual_withDuplicates_skipsDuplicates() {
        AttendanceRaw r1 = raw("E001", LocalDateTime.of(2026, 1, 10, 8, 0));
        AttendanceRaw r2 = raw("E001", LocalDateTime.of(2026, 1, 10, 8, 0)); // duplicate

        when(rawRepository.existsByEmpCardNoAndScanDatetime(r1.getEmpCardNo(), r1.getScanDatetime()))
                .thenReturn(false)
                .thenReturn(true); // second call is a duplicate

        when(rawRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        int saved = downloadDataService.uploadManual(List.of(r1, r2));

        assertThat(saved).isEqualTo(1);
        verify(rawRepository, times(1)).save(any());
    }

    private AttendanceRaw raw(String empCardNo, LocalDateTime scanDatetime) {
        AttendanceRaw r = new AttendanceRaw();
        r.setEmpCardNo(empCardNo);
        r.setScanDatetime(scanDatetime);
        return r;
    }
}
