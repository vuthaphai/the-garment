package com.thegarment.bff.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("The Garment HR System")
                        .version("1.0.0")
                        .description("HR Time Attendance & Payroll System - Reactive Microservices")
                        .contact(new Contact()
                                .name("The Garment Team")
                                .email("support@thegarment.local")));
    }

    @Bean
    public GroupedOpenApi bffApi() {
        return GroupedOpenApi.builder()
                .group("bff")
                .displayName("BFF Service - Client APIs")
                .pathsToMatch("/api/v1/**")
                .build();
    }
}
