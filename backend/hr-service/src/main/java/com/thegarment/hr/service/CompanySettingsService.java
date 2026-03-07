package com.thegarment.hr.service;

import com.thegarment.hr.entity.CompanySettings;
import com.thegarment.hr.repository.CompanySettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanySettingsService {

    private final CompanySettingsRepository repository;

    public CompanySettings get() {
        return repository.findAll().stream().findFirst()
                .orElseGet(() -> repository.save(new CompanySettings()));
    }

    public CompanySettings update(CompanySettings settings) {
        CompanySettings existing = repository.findAll().stream().findFirst()
                .orElse(new CompanySettings());
        settings.setId(existing.getId());
        return repository.save(settings);
    }
}
