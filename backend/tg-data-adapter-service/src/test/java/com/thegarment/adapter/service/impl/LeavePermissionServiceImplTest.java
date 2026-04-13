package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.LeavePermissionRequest;
import com.thegarment.adapter.entity.LeavePermissionEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.LeavePermissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LeavePermissionServiceImplTest {

    @Mock
    private LeavePermissionRepository leavePermissionRepository;

    @Mock
    private R2dbcEntityTemplate r2dbcEntityTemplate;

    private LeavePermissionServiceImpl leavePermissionService;

    @BeforeEach
    void setUp() {
        leavePermissionService = new LeavePermissionServiceImpl(leavePermissionRepository, r2dbcEntityTemplate);
    }

    @Test
    void createShouldPersistAndMapResponse() {
        LeavePermissionRequest request = new LeavePermissionRequest(
                "E-001",
                "PERSONAL",
                LocalDate.of(2026, 1, 1),
                LocalDate.of(2026, 1, 2),
                "Family event",
                new BigDecimal("8.0"));
        LeavePermissionEntity saved = LeavePermissionEntity.builder()
                .id(11L)
                .empCardNo("E-001")
                .permissionType("PERSONAL")
                .fromDate(LocalDate.of(2026, 1, 1))
                .toDate(LocalDate.of(2026, 1, 2))
                .description("Family event")
                .leaveHours(new BigDecimal("8.0"))
                .build();
        when(leavePermissionRepository.save(any(LeavePermissionEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(leavePermissionService.create(request))
                .expectNextMatches(response -> response.id().equals(11L)
                        && response.empCardNo().equals("E-001")
                        && response.permissionType().equals("PERSONAL"))
                .verifyComplete();

        ArgumentCaptor<LeavePermissionEntity> captor = ArgumentCaptor.forClass(LeavePermissionEntity.class);
        verify(leavePermissionRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getDescription()).isEqualTo("Family event");
    }

    @Test
    void updateShouldFailWhenLeavePermissionDoesNotExist() {
        when(leavePermissionRepository.findById(14L)).thenReturn(Mono.empty());

        StepVerifier.create(leavePermissionService.update(14L, new LeavePermissionRequest(
                        "E-009", "SICK", LocalDate.now(), LocalDate.now(), "", BigDecimal.ONE)))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }

    @Test
    void deleteShouldRemoveExistingPermission() {
        LeavePermissionEntity existing = LeavePermissionEntity.builder().id(4L).empCardNo("E-010").build();
        when(leavePermissionRepository.findById(4L)).thenReturn(Mono.just(existing));
        when(leavePermissionRepository.delete(existing)).thenReturn(Mono.empty());

        StepVerifier.create(leavePermissionService.delete(4L)).verifyComplete();

        verify(leavePermissionRepository).delete(existing);
    }
}
