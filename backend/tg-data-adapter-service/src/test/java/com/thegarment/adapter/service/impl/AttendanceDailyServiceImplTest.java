package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.entity.AttendanceDailyEntity;
import com.thegarment.adapter.repository.AttendanceDailyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Answers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.core.ReactiveSelectOperation;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AttendanceDailyServiceImplTest {

    @Mock
    private AttendanceDailyRepository attendanceDailyRepository;

    @Mock(answer = Answers.RETURNS_DEEP_STUBS)
    private R2dbcEntityTemplate r2dbcEntityTemplate;

    private AttendanceDailyServiceImpl attendanceDailyService;

    @BeforeEach
    void setUp() {
        attendanceDailyService = new AttendanceDailyServiceImpl(attendanceDailyRepository, r2dbcEntityTemplate);
    }

    @Test
    @SuppressWarnings("unchecked")
    void findPageShouldReturnPagedAttendanceRows() {
        AttendanceDailyEntity entity = AttendanceDailyEntity.builder()
                .id(1L)
                .empCardNo("E-100")
                .scanDate(LocalDate.of(2026, 1, 10))
                .workingHours(new BigDecimal("8.0"))
                .workDayType("WORK")
                .leaveHours(BigDecimal.ZERO)
                .ot1(new BigDecimal("1.0"))
                .build();

        ReactiveSelectOperation.ReactiveSelect<AttendanceDailyEntity> select =
                (ReactiveSelectOperation.ReactiveSelect<AttendanceDailyEntity>) r2dbcEntityTemplate.select(AttendanceDailyEntity.class);

        when(r2dbcEntityTemplate.count(any(), any(Class.class))).thenReturn(Mono.just(1L));
        when(select.matching(any()).all()).thenReturn(Flux.just(entity));

        StepVerifier.create(attendanceDailyService.findPage(0, 10, "E-100", null, null))
                .expectNextMatches(page -> page.totalElements() == 1
                        && page.content().size() == 1
                        && page.content().getFirst().empCardNo().equals("E-100")
                        && page.content().getFirst().workingHours().compareTo(new BigDecimal("8.0")) == 0)
                .verifyComplete();
    }
}
