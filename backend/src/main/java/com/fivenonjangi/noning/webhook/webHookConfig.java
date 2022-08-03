package com.fivenonjangi.noning.webhook;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class webHookConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
