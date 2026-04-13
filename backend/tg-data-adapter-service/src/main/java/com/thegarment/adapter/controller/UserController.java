package com.thegarment.adapter.controller;

import com.thegarment.adapter.dto.response.UserResponse;
import com.thegarment.adapter.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/username/{username}")
    public Mono<ResponseEntity<UserResponse>> findByUsername(@PathVariable String username) {
        return userService.findByUsername(username).map(ResponseEntity::ok);
    }
}
