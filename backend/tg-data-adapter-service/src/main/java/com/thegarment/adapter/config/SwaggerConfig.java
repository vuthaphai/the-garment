package com.thegarment.adapter.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("The Garment HR System - Data Adapter")
                        .version("1.0.0")
                        .description("HR Data Management - Employee, Attendance, Settings & Masters")
                        .contact(new Contact()
                                .name("The Garment Team")
                                .email("support@thegarment.local")));
    }
}
