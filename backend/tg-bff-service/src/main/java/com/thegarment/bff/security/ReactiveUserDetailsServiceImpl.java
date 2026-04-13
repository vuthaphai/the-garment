package com.thegarment.bff.security;

import com.thegarment.bff.client.DataAdapterClient;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReactiveUserDetailsServiceImpl implements ReactiveUserDetailsService {

    private final DataAdapterClient dataAdapterClient;

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return dataAdapterClient.getUserByUsername(username)
                .map(userResponse -> User.builder()
                        .username(userResponse.username())
                        .password(userResponse.password())
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + userResponse.role())))
                        .accountExpired(false)
                        .accountLocked(false)
                        .credentialsExpired(false)
                        .disabled(!userResponse.enabled())
                        .build());
    }
}
