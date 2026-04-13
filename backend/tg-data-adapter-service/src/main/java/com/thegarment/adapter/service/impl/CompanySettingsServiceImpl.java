package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.CompanySettingsRequest;
import com.thegarment.adapter.dto.response.CompanySettingsResponse;
import com.thegarment.adapter.entity.CompanySettingsEntity;
import com.thegarment.adapter.repository.CompanySettingsRepository;
import com.thegarment.adapter.service.CompanySettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CompanySettingsServiceImpl implements CompanySettingsService {

    private final CompanySettingsRepository companySettingsRepository;

    @Override
    public Mono<CompanySettingsResponse> findFirst() {
        return companySettingsRepository.findAll(Sort.by("id"))
                .next()
                .map(this::toResponse);
    }

    @Override
    public Mono<CompanySettingsResponse> save(CompanySettingsRequest request) {
        return companySettingsRepository.findAll(Sort.by("id"))
                .next()
                .switchIfEmpty(Mono.just(CompanySettingsEntity.builder().build()))
                .flatMap(e -> {
                    e.setCompanyName(request.companyName());
                    e.setWorkingDayPerMonth(request.workingDayPerMonth());
                    e.setWorkingHourPerDay(request.workingHourPerDay());
                    e.setCheckAttendanceType(request.checkAttendanceType());
                    e.setAllowCheckBeforePayroll(request.allowCheckBeforePayroll());
                    e.setRoundRiel(request.roundRiel());
                    e.setAttendanceAllowanceType(request.attendanceAllowanceType());
                    e.setSaturdayWorking(request.saturdayWorking());
                    e.setSaturdayHours(request.saturdayHours());
                    e.setSetHolidayByGroup(request.setHolidayByGroup());
                    e.setDownloadDataFrom(request.downloadDataFrom());
                    e.setCutAttendance(request.cutAttendance());
                    e.setCutPrim(request.cutPrim());
                    e.setWorkUnder14Days(request.workUnder14Days());
                    e.setWorkFrom14DaysUp(request.workFrom14DaysUp());
                    if (e.getCreatedAt() == null) {
                        e.setCreatedAt(LocalDateTime.now());
                    }
                    return companySettingsRepository.save(e);
                })
                .map(this::toResponse);
    }

    private CompanySettingsResponse toResponse(CompanySettingsEntity e) {
        return new CompanySettingsResponse(
                e.getId(),
                e.getCompanyName(),
                e.getWorkingDayPerMonth(),
                e.getWorkingHourPerDay(),
                e.getCheckAttendanceType(),
                e.getAllowCheckBeforePayroll(),
                e.getRoundRiel(),
                e.getAttendanceAllowanceType(),
                e.getSaturdayWorking(),
                e.getSaturdayHours(),
                e.getSetHolidayByGroup(),
                e.getDownloadDataFrom(),
                e.getCutAttendance(),
                e.getCutPrim(),
                e.getWorkUnder14Days(),
                e.getWorkFrom14DaysUp(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }
}
