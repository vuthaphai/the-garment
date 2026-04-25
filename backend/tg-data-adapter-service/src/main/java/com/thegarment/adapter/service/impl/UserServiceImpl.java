package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.response.UserAuthResponse;
import com.thegarment.adapter.dto.response.UserResponse;
import com.thegarment.adapter.entity.UserEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.UserRepository;
import com.thegarment.adapter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

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

    @Override
    public Mono<UserAuthResponse> findAuthByUsername(String username) {
        return userRepository.findByUsername(username)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("User", "username", username)))
                .map(this::toAuthResponse);
    }

    private UserResponse toResponse(UserEntity e) {
        return new UserResponse(e.getId(), e.getUsername(), e.getFullName(), e.getRole(),
            e.getLanguage(), e.getActive(), e.getCreatedAt(), e.getUpdatedAt());
    }

    private UserAuthResponse toAuthResponse(UserEntity e) {
        return new UserAuthResponse(
                e.getUsername(),
                e.getPassword(),
                parseRoles(e.getRole()),
                Boolean.TRUE.equals(e.getActive()));
    }

    private List<String> parseRoles(String rawRoles) {
        if (!StringUtils.hasText(rawRoles)) {
            return List.of("VIEWER");
        }
        return Arrays.stream(rawRoles.split(","))
                .map(String::trim)
                .filter(StringUtils::hasText)
                .map(String::toUpperCase)
                .distinct()
                .toList();
    }
}
