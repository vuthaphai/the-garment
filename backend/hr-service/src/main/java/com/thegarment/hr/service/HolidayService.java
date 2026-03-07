package com.thegarment.hr.service;

import com.thegarment.hr.entity.Holiday;
import com.thegarment.hr.repository.HolidayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HolidayService {

    private final HolidayRepository repository;

    public List<Holiday> findByYear(Integer year) {
        return repository.findByYearOrderByHolidayDate(year);
    }

    public Holiday create(Holiday holiday) {
        if (holiday.getYear() == null && holiday.getHolidayDate() != null) {
            holiday.setYear(holiday.getHolidayDate().getYear());
        }
        return repository.save(holiday);
    }

    public Holiday update(Long id, Holiday holiday) {
        holiday.setId(id);
        return repository.save(holiday);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
