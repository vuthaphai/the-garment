package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.response.UserResponse;
import com.thegarment.adapter.entity.UserEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.UserRepository;
import com.thegarment.adapter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Mono<UserResponse> findByUsername(String username) {
        return userRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("User", "username", username)))
                .map(this::toResponse);
    }

    private UserResponse toResponse(UserEntity e) {
        return new UserResponse(e.getId(), e.getUsername(), e.getFullName(), e.getRole(),
            e.getLanguage(), e.getActive(), e.getCreatedAt(), e.getUpdatedAt());
    }
}
