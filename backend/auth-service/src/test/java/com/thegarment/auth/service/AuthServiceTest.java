package com.thegarment.auth.service;

import com.thegarment.auth.dto.LoginRequest;
import com.thegarment.auth.dto.LoginResponse;
import com.thegarment.auth.dto.UserInfoDto;
import com.thegarment.auth.entity.User;
import com.thegarment.auth.repository.UserRepository;
import com.thegarment.auth.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    private User sampleUser() {
        return User.builder()
                .id(1L).username("admin").fullName("Admin User")
                .role("ADMIN").language("en").active(true)
                .build();
    }

    @Test
    void login_validCredentials_returnsLoginResponse() {
        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("secret");

        when(authenticationManager.authenticate(any())).thenReturn(mock(Authentication.class));
        when(userRepository.findByUsernameAndActiveTrue("admin")).thenReturn(Optional.of(sampleUser()));
        when(jwtTokenProvider.generateToken(1L, "admin", "ADMIN")).thenReturn("jwt-token-xyz");
        when(jwtTokenProvider.getExpirationMs()).thenReturn(28800000L);

        LoginResponse response = authService.login(request);

        assertThat(response.getAccessToken()).isEqualTo("jwt-token-xyz");
        assertThat(response.getTokenType()).isEqualTo("Bearer");
        assertThat(response.getUser().getUsername()).isEqualTo("admin");
        assertThat(response.getUser().getRole()).isEqualTo("ADMIN");
    }

    @Test
    void login_authenticationFails_throwsException() {
        LoginRequest request = new LoginRequest();
        request.setUsername("admin");
        request.setPassword("wrong");

        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void login_userNotFoundAfterAuth_throwsException() {
        LoginRequest request = new LoginRequest();
        request.setUsername("ghost");
        request.setPassword("pass");

        when(authenticationManager.authenticate(any())).thenReturn(mock(Authentication.class));
        when(userRepository.findByUsernameAndActiveTrue("ghost")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void getCurrentUser_userExists_returnsUserInfoDto() {
        when(userRepository.findByUsernameAndActiveTrue("admin"))
                .thenReturn(Optional.of(sampleUser()));

        UserInfoDto dto = authService.getCurrentUser("admin");

        assertThat(dto.getUsername()).isEqualTo("admin");
        assertThat(dto.getFullName()).isEqualTo("Admin User");
        assertThat(dto.getRole()).isEqualTo("ADMIN");
        assertThat(dto.getLanguage()).isEqualTo("en");
    }

    @Test
    void getCurrentUser_userNotFound_throwsException() {
        when(userRepository.findByUsernameAndActiveTrue("nobody")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.getCurrentUser("nobody"))
                .isInstanceOf(RuntimeException.class);
    }
}
