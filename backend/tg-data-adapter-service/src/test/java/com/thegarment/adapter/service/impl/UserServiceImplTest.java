package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.entity.UserEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.time.LocalDateTime;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    void findByUsernameShouldMapExistingUser() {
        UserEntity user = UserEntity.builder()
                .id(7L)
                .username("admin")
                .fullName("Admin User")
                .role("ADMIN")
                .language("en")
                .active(true)
                .createdAt(LocalDateTime.of(2026, 1, 1, 8, 0))
                .updatedAt(LocalDateTime.of(2026, 1, 2, 8, 0))
                .build();
        when(userRepository.findByUsername("admin")).thenReturn(Mono.just(user));

        StepVerifier.create(userService.findByUsername("admin"))
                .expectNextMatches(response -> response.id().equals(7L)
                        && response.username().equals("admin")
                        && response.role().equals("ADMIN"))
                .verifyComplete();
    }

    @Test
    void findByUsernameShouldFailWhenUserDoesNotExist() {
        when(userRepository.findByUsername("missing")).thenReturn(Mono.empty());

        StepVerifier.create(userService.findByUsername("missing"))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }
}
