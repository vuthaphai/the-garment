package com.thegarment.hr.service;

import com.thegarment.hr.dto.EmployeeDto;
import com.thegarment.hr.dto.EmployeeRequest;
import com.thegarment.hr.entity.*;
import com.thegarment.hr.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final NationalityRepository nationalityRepository;
    private final CityRepository cityRepository;
    private final GroupPositionRepository groupPositionRepository;
    private final GroupRepository groupRepository;
    private final PositionRepository positionRepository;
    private final ContractTypeRepository contractTypeRepository;

    public Page<EmployeeDto> search(String search, Boolean active, Pageable pageable) {
        return employeeRepository.search(search, active, pageable).map(this::toDto);
    }

    public EmployeeDto findById(Long id) {
        return toDto(employeeRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + id)));
    }

    @Transactional
    public EmployeeDto create(EmployeeRequest request) {
        Employee employee = buildEmployee(new Employee(), request);
        applyContracts(employee, request.getContracts());
        return toDto(employeeRepository.save(employee));
    }

    @Transactional
    public EmployeeDto update(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + id));
        buildEmployee(employee, request);
        employee.getContracts().clear();
        applyContracts(employee, request.getContracts());
        return toDto(employeeRepository.save(employee));
    }

    @Transactional
    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) throw new EntityNotFoundException("Employee not found: " + id);
        employeeRepository.deleteById(id);
    }

    private Employee buildEmployee(Employee e, EmployeeRequest r) {
        e.setEmpCardNo(r.getEmpCardNo());
        e.setSerialCardNo(r.getSerialCardNo());
        e.setNativeName(r.getNativeName());
        e.setForeignName(r.getForeignName());
        e.setDateOfBirth(r.getDateOfBirth());
        e.setSex(r.getSex());
        e.setSocialSecurity(r.getSocialSecurity());
        e.setElectionCard(r.getElectionCard());
        e.setPlaceOfBirth(r.getPlaceOfBirth());
        e.setMaritalStatus(r.getMaritalStatus());
        e.setSpouseName(r.getSpouseName());
        e.setChildrenCount(r.getChildrenCount());
        e.setEmail(r.getEmail());
        e.setCurrentAddress(r.getCurrentAddress());
        e.setDescription(r.getDescription());
        e.setTel(r.getTel());
        e.setDriverLicense(r.getDriverLicense());
        e.setHealthCheckUp(r.getHealthCheckUp());
        e.setWorkBook(r.getWorkBook());
        e.setFingerPrint(r.getFingerPrint());
        e.setFamilyListNum(r.getFamilyListNum());
        e.setAnlOldUsed(r.getAnlOldUsed());
        e.setDateJoined(r.getDateJoined());
        e.setDateResigned(r.getDateResigned());
        e.setPaymentType(r.getPaymentType());
        e.setCurrency(r.getCurrency());
        e.setSalary(r.getSalary());
        e.setActive(r.getActive());

        if (r.getNationalityId() != null) {
            e.setNationality(nationalityRepository.findById(r.getNationalityId()).orElse(null));
        }
        if (r.getCityId() != null) {
            e.setCity(cityRepository.findById(r.getCityId()).orElse(null));
        }
        if (r.getGroupPositionId() != null) {
            e.setGroupPosition(groupPositionRepository.findById(r.getGroupPositionId()).orElse(null));
        }
        if (r.getGroupId() != null) {
            e.setGroup(groupRepository.findById(r.getGroupId()).orElse(null));
        }
        if (r.getPositionId() != null) {
            e.setPosition(positionRepository.findById(r.getPositionId()).orElse(null));
        }
        return e;
    }

    private void applyContracts(Employee employee, List<EmployeeDto.EmployeeContractDto> contracts) {
        if (contracts == null) return;
        contracts.forEach(c -> {
            ContractType ct = c.getContractTypeId() != null
                    ? contractTypeRepository.findById(c.getContractTypeId()).orElse(null) : null;
            employee.getContracts().add(EmployeeContract.builder()
                    .employee(employee).contractType(ct)
                    .fromDate(c.getFromDate()).toDate(c.getToDate()).months(c.getMonths())
                    .build());
        });
    }

    private EmployeeDto toDto(Employee e) {
        List<EmployeeDto.EmployeeContractDto> contracts = e.getContracts() == null ? new ArrayList<>()
                : e.getContracts().stream().map(c -> EmployeeDto.EmployeeContractDto.builder()
                        .id(c.getId())
                        .contractTypeId(c.getContractType() != null ? c.getContractType().getId() : null)
                        .contractTypeName(c.getContractType() != null ? c.getContractType().getContractName() : null)
                        .fromDate(c.getFromDate()).toDate(c.getToDate()).months(c.getMonths())
                        .build()).collect(Collectors.toList());

        return EmployeeDto.builder()
                .id(e.getId()).empCardNo(e.getEmpCardNo()).serialCardNo(e.getSerialCardNo())
                .nativeName(e.getNativeName()).foreignName(e.getForeignName())
                .dateOfBirth(e.getDateOfBirth())
                .nationalityId(e.getNationality() != null ? e.getNationality().getId() : null)
                .nationalityName(e.getNationality() != null ? e.getNationality().getForeignName() : null)
                .sex(e.getSex()).socialSecurity(e.getSocialSecurity()).electionCard(e.getElectionCard())
                .placeOfBirth(e.getPlaceOfBirth())
                .cityId(e.getCity() != null ? e.getCity().getId() : null)
                .cityName(e.getCity() != null ? e.getCity().getForeignName() : null)
                .maritalStatus(e.getMaritalStatus()).spouseName(e.getSpouseName())
                .childrenCount(e.getChildrenCount()).email(e.getEmail())
                .currentAddress(e.getCurrentAddress()).description(e.getDescription())
                .tel(e.getTel()).driverLicense(e.getDriverLicense())
                .healthCheckUp(e.getHealthCheckUp()).workBook(e.getWorkBook())
                .fingerPrint(e.getFingerPrint()).familyListNum(e.getFamilyListNum())
                .anlOldUsed(e.getAnlOldUsed())
                .groupPositionId(e.getGroupPosition() != null ? e.getGroupPosition().getId() : null)
                .groupPositionName(e.getGroupPosition() != null ? e.getGroupPosition().getNativeName() : null)
                .groupId(e.getGroup() != null ? e.getGroup().getId() : null)
                .groupName(e.getGroup() != null ? e.getGroup().getGroupName() : null)
                .positionId(e.getPosition() != null ? e.getPosition().getId() : null)
                .positionName(e.getPosition() != null ? e.getPosition().getForeignName() : null)
                .dateJoined(e.getDateJoined()).dateResigned(e.getDateResigned())
                .paymentType(e.getPaymentType()).currency(e.getCurrency()).salary(e.getSalary())
                .photoPath(e.getPhotoPath()).active(e.getActive())
                .contracts(contracts)
                .build();
    }
}
