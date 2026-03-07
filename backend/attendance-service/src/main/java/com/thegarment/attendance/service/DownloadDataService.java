package com.thegarment.attendance.service;

import com.thegarment.attendance.entity.AttendanceRaw;
import com.thegarment.attendance.repository.AttendanceRawRepository;
import com.thegarment.attendance.repository.ControllerRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DownloadDataService {

    private final ControllerRepository controllerRepository;
    private final AttendanceRawRepository rawRepository;

    public void initiateDownload(Long controllerId) {
        controllerRepository.findByIdWithMachines(controllerId)
                .orElseThrow(() -> new EntityNotFoundException("Controller not found: " + controllerId));
        // In production: call biometric SDK to pull data from machine over TCP
        log.info("Download requested for controller {}", controllerId);
    }

    public int uploadManual(List<AttendanceRaw> records) {
        int saved = 0;
        for (AttendanceRaw record : records) {
            if (!rawRepository.existsByEmpCardNoAndScanDatetime(
                    record.getEmpCardNo(), record.getScanDatetime())) {
                rawRepository.save(record);
                saved++;
            }
        }
        return saved;
    }
}
