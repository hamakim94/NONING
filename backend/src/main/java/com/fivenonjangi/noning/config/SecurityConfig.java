package com.fivenonjangi.noning.config;

import com.fivenonjangi.noning.config.security.JwtTokenFilter;
import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig{

    private final JwtTokenProvider jwtTokenProvider;

    private static final String[] PUBLIC_API_URI = {
            "/api/users/signup", "/api/users/login", "/api/boards/list/**", "/api/users/logout", "/api/users/verify", "/api/users/passwords/find", "/api/users/reissue", "/api/users/duplications/check"
            ,"/api/users/upload", "/api/chats/**"
    };
    private static final String[] PUBLIC_WEB_URI = {
           "/swagger-ui/**", "/swagger-resources/**",
            "/swagger-ui.html", "/webjars/**", "/swagger/**", "/v2/api-docs"
    };
    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(PUBLIC_API_URI).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new JwtTokenFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    protected WebSecurityCustomizer webSecurityCustomizer() throws Exception {
        // Allow swagger to be accessed without authentication
        return (web) -> web.ignoring().antMatchers(PUBLIC_WEB_URI)//
//                .antMatchers("/swagger-resources/**")//
//                .antMatchers("/swagger-ui.html")//
//                .antMatchers("/configuration/**")//
//                .antMatchers("/webjars/**")//
//                .antMatchers("/public")

//         Un-secure H2 Database (for testing purposes, H2 console shouldn't be unprotected in production)
                .and()
                .ignoring()
                .antMatchers("/h2-console/**/**");
    }

//    @Bean
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//                .withUser("admin").password(passwordEncoder().encode("1234")).roles("ADMIN")
//                .and()
//                .withUser("guest").password(passwordEncoder().encode("guest")).roles("GUEST");
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return  new BCryptPasswordEncoder();
    }
}
