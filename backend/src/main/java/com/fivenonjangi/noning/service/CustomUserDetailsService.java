package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.entity.user.UserData;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@RequiredArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserData userData = null;
        try {
            userData =userService.getUserByEmail(email);
            if (userData == null) {
                throw new UsernameNotFoundException("User '" + email + "' not found");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return User
                .withUsername(email)
                .password(userData.getPassword())
                .authorities(new ArrayList<GrantedAuthority>())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
