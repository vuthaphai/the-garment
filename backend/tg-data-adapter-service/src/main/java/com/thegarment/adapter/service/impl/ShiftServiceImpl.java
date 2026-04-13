package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.ShiftRequest;
import com.thegarment.adapter.dto.response.ShiftResponse;
import com.thegarment.adapter.entity.ShiftEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.ShiftRepository;
import com.thegarment.adapter.service.ShiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ShiftServiceImpl implements ShiftService {

    private final ShiftRepository shiftRepository;

    @Override
    public Flux<ShiftResponse> findAll() {
        return shiftRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<ShiftResponse> findById(Long id) {
        return shiftRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Shift", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<ShiftResponse> create(ShiftRequest request) {
        ShiftEntity entity = toEntity(request);
        return shiftRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<ShiftResponse> update(Long id, ShiftRequest request) {
        return shiftRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Shift", id)))
                .flatMap(e -> {
                    updateEntity(e, request);
                    return shiftRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return shiftRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Shift", id)))
                .flatMap(shiftRepository::delete);
    }

    private ShiftEntity toEntity(ShiftRequest r) {
        return ShiftEntity.builder()
                .nativeName(r.nativeName())
                .foreignName(r.foreignName())
                .authorizationBefore(r.authorizationBefore())
                .authorizationAfter(r.authorizationAfter())
                .shiftType(r.shiftType())
                .firstStart(r.firstStart()).firstEnd(r.firstEnd())
                .secondStart(r.secondStart()).secondEnd(r.secondEnd())
                .ot1Start(r.ot1Start()).ot1End(r.ot1End())
                .ot2Start(r.ot2Start()).ot2End(r.ot2End())
                .ot3Start(r.ot3Start()).ot3End(r.ot3End())
                .ot1Rate(r.ot1Rate()).ot2Rate(r.ot2Rate()).ot3Rate(r.ot3Rate())
                .saturdayRate(r.saturdayRate()).sundayRate(r.sundayRate()).holidayRate(r.holidayRate())
                .shiftBonus(r.shiftBonus())
                .foodAllowanceOt1(r.foodAllowanceOt1())
                .foodAllowanceOt2Slot1(r.foodAllowanceOt2Slot1())
                .foodAllowanceOt2Slot2(r.foodAllowanceOt2Slot2())
                .foodAllowanceOt3(r.foodAllowanceOt3())
                .build();
    }

    private void updateEntity(ShiftEntity e, ShiftRequest r) {
        e.setNativeName(r.nativeName());
        e.setForeignName(r.foreignName());
        e.setAuthorizationBefore(r.authorizationBefore());
        e.setAuthorizationAfter(r.authorizationAfter());
        e.setShiftType(r.shiftType());
        e.setFirstStart(r.firstStart());
        e.setFirstEnd(r.firstEnd());
        e.setSecondStart(r.secondStart());
        e.setSecondEnd(r.secondEnd());
        e.setOt1Start(r.ot1Start()); e.setOt1End(r.ot1End());
        e.setOt2Start(r.ot2Start()); e.setOt2End(r.ot2End());
        e.setOt3Start(r.ot3Start()); e.setOt3End(r.ot3End());
        e.setOt1Rate(r.ot1Rate());
        e.setOt2Rate(r.ot2Rate());
        e.setOt3Rate(r.ot3Rate());
        e.setSaturdayRate(r.saturdayRate());
        e.setSundayRate(r.sundayRate());
        e.setHolidayRate(r.holidayRate());
        e.setShiftBonus(r.shiftBonus());
        e.setFoodAllowanceOt1(r.foodAllowanceOt1());
        e.setFoodAllowanceOt2Slot1(r.foodAllowanceOt2Slot1());
        e.setFoodAllowanceOt2Slot2(r.foodAllowanceOt2Slot2());
        e.setFoodAllowanceOt3(r.foodAllowanceOt3());
    }

    private ShiftResponse toResponse(ShiftEntity e) {
        return new ShiftResponse(e.getId(), e.getNativeName(), e.getForeignName(),
                e.getAuthorizationBefore(), e.getAuthorizationAfter(), e.getShiftType(),
                e.getFirstStart(), e.getFirstEnd(), e.getSecondStart(), e.getSecondEnd(),
                e.getOt1Start(), e.getOt1End(), e.getOt2Start(), e.getOt2End(), e.getOt3Start(), e.getOt3End(),
                e.getOt1Rate(), e.getOt2Rate(), e.getOt3Rate(), e.getSaturdayRate(), e.getSundayRate(), e.getHolidayRate(),
                e.getShiftBonus(), e.getFoodAllowanceOt1(), e.getFoodAllowanceOt2Slot1(), e.getFoodAllowanceOt2Slot2(), e.getFoodAllowanceOt3(),
                e.getCreatedAt(), e.getUpdatedAt());
    }
}
