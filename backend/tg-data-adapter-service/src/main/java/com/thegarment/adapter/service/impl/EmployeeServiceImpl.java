package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.PageResponse;
import com.thegarment.adapter.dto.request.EmployeeRequest;
import com.thegarment.adapter.dto.response.EmployeeResponse;
import com.thegarment.adapter.entity.*;
import com.thegarment.adapter.exception.BusinessException;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.*;
import com.thegarment.adapter.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeContractRepository contractRepository;
    private final NationalityRepository nationalityRepository;
    private final CityRepository cityRepository;
    private final GroupPositionRepository groupPositionRepository;
    private final GroupRepository groupRepository;
    private final PositionRepository positionRepository;
    private final ContractTypeRepository contractTypeRepository;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;

    @Override
    public Mono<PageResponse<EmployeeResponse>> findPage(int page, int size, Boolean active) {
        Query baseQuery = active != null
                ? Query.query(Criteria.where("active").is(active))
                : Query.empty();
        Mono<Long> countMono = r2dbcEntityTemplate.count(baseQuery, EmployeeEntity.class);
        Mono<List<EmployeeResponse>> contentMono = r2dbcEntityTemplate
                .select(EmployeeEntity.class)
                .matching(baseQuery.offset((long) page * size).limit(size))
                .all()
                .flatMap(this::enrichEmployee)
                .collectList();
        return Mono.zip(contentMono, countMono)
                .map(t -> PageResponse.of(t.getT1(), page, size, t.getT2()));
    }

    @Override
    public Mono<EmployeeResponse> findById(Long id) {
        return employeeRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Employee", id)))
                .flatMap(this::enrichEmployee);
    }

    @Override
    public Mono<EmployeeResponse> findByEmpCardNo(String empCardNo) {
        return employeeRepository.findByEmpCardNo(empCardNo)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Employee", "empCardNo", empCardNo)))
                .flatMap(this::enrichEmployee);
    }

    @Override
    @Transactional
    public Mono<EmployeeResponse> create(EmployeeRequest request) {
        return employeeRepository.existsByEmpCardNo(request.empCardNo())
                .flatMap(exists -> {
                    if (exists) return Mono.error(new BusinessException("Employee card no already exists: " + request.empCardNo()));
                    EmployeeEntity entity = toEntity(request);
                    return employeeRepository.save(entity)
                            .flatMap(saved -> saveContracts(saved, request).thenReturn(saved))
                            .flatMap(this::enrichEmployee);
                });
    }

    @Override
    @Transactional
    public Mono<EmployeeResponse> update(Long id, EmployeeRequest request) {
        return employeeRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Employee", id)))
                .flatMap(entity -> {
                    updateEntity(entity, request);
                    return employeeRepository.save(entity);
                })
                .flatMap(saved -> contractRepository.deleteByEmployeeId(saved.getId())
                        .then(saveContracts(saved, request))
                        .thenReturn(saved))
                .flatMap(this::enrichEmployee);
    }

    @Override
    @Transactional
    public Mono<Void> delete(Long id) {
        return employeeRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Employee", id)))
                .flatMap(entity -> contractRepository.deleteByEmployeeId(id)
                        .then(employeeRepository.delete(entity)));
    }

    private Mono<Void> saveContracts(EmployeeEntity employee, EmployeeRequest request) {
        if (request.contracts() == null || request.contracts().isEmpty()) return Mono.empty();
        List<EmployeeContractEntity> contracts = request.contracts().stream()
                .map(c -> EmployeeContractEntity.builder()
                        .employeeId(employee.getId())
                        .contractTypeId(c.contractTypeId())
                        .fromDate(c.fromDate())
                        .toDate(c.toDate())
                        .months(c.months())
                        .build())
                .collect(Collectors.toCollection(ArrayList::new));
        return contractRepository.saveAll(contracts).then();
    }

    private Mono<EmployeeResponse> enrichEmployee(EmployeeEntity e) {
        Mono<String> natName = e.getNationalityId() != null
                ? nationalityRepository.findById(e.getNationalityId()).map(n -> n.getNativeName()).defaultIfEmpty("")
                : Mono.just("");
        Mono<String> cityName = e.getCityId() != null
                ? cityRepository.findById(e.getCityId()).map(c -> c.getNativeName()).defaultIfEmpty("")
                : Mono.just("");
        Mono<String> gpName = e.getGroupPositionId() != null
                ? groupPositionRepository.findById(e.getGroupPositionId()).map(g -> g.getNativeName()).defaultIfEmpty("")
                : Mono.just("");
        Mono<String> grpName = e.getGroupId() != null
                ? groupRepository.findById(e.getGroupId()).map(g -> g.getGroupName()).defaultIfEmpty("")
                : Mono.just("");
        Mono<String> posName = e.getPositionId() != null
                ? positionRepository.findById(e.getPositionId()).map(p -> p.getNativeName()).defaultIfEmpty("")
                : Mono.just("");
        Mono<List<EmployeeResponse.ContractItem>> contracts = contractRepository.findByEmployeeId(e.getId())
                .flatMap(c -> {
                    Mono<String> ctName = c.getContractTypeId() != null
                            ? contractTypeRepository.findById(c.getContractTypeId()).map(ct -> ct.getContractName()).defaultIfEmpty("")
                            : Mono.just("");
                    return ctName.map(name -> new EmployeeResponse.ContractItem(
                            c.getId(), c.getContractTypeId(), name, c.getFromDate(), c.getToDate(), c.getMonths(), c.getCreatedAt()));
                })
                .collectList();

        return Mono.zip(natName, cityName, gpName, grpName, posName, contracts)
                .map(t -> toResponse(e, t.getT1(), t.getT2(), t.getT3(), t.getT4(), t.getT5(), t.getT6()));
    }

    private EmployeeEntity toEntity(EmployeeRequest r) {
        return EmployeeEntity.builder()
                .empCardNo(r.empCardNo()).serialCardNo(r.serialCardNo())
                .nativeName(r.nativeName()).foreignName(r.foreignName())
                .dateOfBirth(r.dateOfBirth()).nationalityId(r.nationalityId())
                .sex(r.sex() != null ? r.sex() : "F")
                .socialSecurity(r.socialSecurity()).electionCard(r.electionCard())
                .placeOfBirth(r.placeOfBirth()).cityId(r.cityId())
                .maritalStatus(r.maritalStatus()).spouseName(r.spouseName())
                .childrenCount(r.childrenCount() != null ? r.childrenCount() : 0)
                .email(r.email()).currentAddress(r.currentAddress()).description(r.description())
                .tel(r.tel()).driverLicense(r.driverLicense())
                .healthCheckUp(r.healthCheckUp() != null ? r.healthCheckUp() : false)
                .workBook(r.workBook() != null ? r.workBook() : false)
                .fingerPrint(r.fingerPrint() != null ? r.fingerPrint() : 0)
                .familyListNum(r.familyListNum())
                .anlOldUsed(r.anlOldUsed() != null ? r.anlOldUsed() : 0)
                .groupPositionId(r.groupPositionId()).groupId(r.groupId()).positionId(r.positionId())
                .dateJoined(r.dateJoined()).dateResigned(r.dateResigned())
                .paymentType(r.paymentType() != null ? r.paymentType() : "Month")
                .currency(r.currency() != null ? r.currency() : "$")
                .salary(r.salary()).photoPath(r.photoPath())
                .active(r.active() != null ? r.active() : true)
                .build();
    }

    private void updateEntity(EmployeeEntity e, EmployeeRequest r) {
        e.setEmpCardNo(r.empCardNo()); e.setSerialCardNo(r.serialCardNo());
        e.setNativeName(r.nativeName()); e.setForeignName(r.foreignName());
        e.setDateOfBirth(r.dateOfBirth()); e.setNationalityId(r.nationalityId());
        if (r.sex() != null) e.setSex(r.sex());
        e.setSocialSecurity(r.socialSecurity()); e.setElectionCard(r.electionCard());
        e.setPlaceOfBirth(r.placeOfBirth()); e.setCityId(r.cityId());
        e.setMaritalStatus(r.maritalStatus()); e.setSpouseName(r.spouseName());
        if (r.childrenCount() != null) e.setChildrenCount(r.childrenCount());
        e.setEmail(r.email()); e.setCurrentAddress(r.currentAddress()); e.setDescription(r.description());
        e.setTel(r.tel()); e.setDriverLicense(r.driverLicense());
        if (r.healthCheckUp() != null) e.setHealthCheckUp(r.healthCheckUp());
        if (r.workBook() != null) e.setWorkBook(r.workBook());
        if (r.fingerPrint() != null) e.setFingerPrint(r.fingerPrint());
        e.setFamilyListNum(r.familyListNum());
        if (r.anlOldUsed() != null) e.setAnlOldUsed(r.anlOldUsed());
        e.setGroupPositionId(r.groupPositionId()); e.setGroupId(r.groupId()); e.setPositionId(r.positionId());
        e.setDateJoined(r.dateJoined()); e.setDateResigned(r.dateResigned());
        if (r.paymentType() != null) e.setPaymentType(r.paymentType());
        if (r.currency() != null) e.setCurrency(r.currency());
        e.setSalary(r.salary()); e.setPhotoPath(r.photoPath());
        if (r.active() != null) e.setActive(r.active());
    }

    private EmployeeResponse toResponse(EmployeeEntity e, String natName, String cityName,
            String gpName, String grpName, String posName, List<EmployeeResponse.ContractItem> contracts) {
        return new EmployeeResponse(
                e.getId(), e.getEmpCardNo(), e.getSerialCardNo(), e.getNativeName(), e.getForeignName(),
                e.getDateOfBirth(), e.getNationalityId(), natName, e.getSex(),
                e.getSocialSecurity(), e.getElectionCard(), e.getPlaceOfBirth(),
                e.getCityId(), cityName, e.getMaritalStatus(), e.getSpouseName(), e.getChildrenCount(),
                e.getEmail(), e.getCurrentAddress(), e.getDescription(), e.getTel(), e.getDriverLicense(),
                e.getHealthCheckUp(), e.getWorkBook(), e.getFingerPrint(), e.getFamilyListNum(), e.getAnlOldUsed(),
                e.getGroupPositionId(), gpName, e.getGroupId(), grpName, e.getPositionId(), posName,
                e.getDateJoined(), e.getDateResigned(), e.getPaymentType(), e.getCurrency(), e.getSalary(),
                e.getPhotoPath(), e.getActive(), e.getCreatedAt(), e.getUpdatedAt(), contracts
        );
    }
}
