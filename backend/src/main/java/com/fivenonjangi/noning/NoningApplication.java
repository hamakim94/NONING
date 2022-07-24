package com.fivenonjangi.noning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class NoningApplication {

    public static void main(String[] args) {
        SpringApplication.run(NoningApplication.class, args);
    }

}
