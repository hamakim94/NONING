package com.fivenonjangi.noning.service.user;

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
    public UserDetails loadUserByUsername(String userId) {
        UserData userData = null;
        try {
            userData =userService.getUserById(Long.parseLong(userId));
            if (userData == null) {
                throw new UsernameNotFoundException("User '" + userId + "' not found");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return User
                .withUsername(userId)
                .password(userData.getPassword())
                .authorities(new ArrayList<GrantedAuthority>())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}
