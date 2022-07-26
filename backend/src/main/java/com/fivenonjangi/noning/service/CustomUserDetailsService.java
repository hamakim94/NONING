package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.entity.user.UserData;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String id) {
        UserData userData = null;
        try {
            userData =userService.getUserById(Long.valueOf(id));
            if (userData == null) {
                throw new UsernameNotFoundException("User '" + id + "' not found");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return org.springframework.security.core.userdetails.User
                .withUsername(id)
                .password(userData.getPassword())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
