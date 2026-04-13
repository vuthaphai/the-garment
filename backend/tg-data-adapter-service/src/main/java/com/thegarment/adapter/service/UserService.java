package com.thegarment.adapter.service;

import com.thegarment.adapter.dto.response.UserResponse;
import reactor.core.publisher.Mono;

public interface UserService {
    Mono<UserResponse> findByUsername(String username);
}
