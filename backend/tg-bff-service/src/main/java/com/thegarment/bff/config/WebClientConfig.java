package com.thegarment.bff.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean("dataAdapterWebClient")
    public WebClient dataAdapterWebClient(
            @Value("${app.data-adapter-url}") String dataAdapterUrl) {
        return WebClient.builder()
                .baseUrl(dataAdapterUrl)
                .codecs(config -> config.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build();
    }
}
