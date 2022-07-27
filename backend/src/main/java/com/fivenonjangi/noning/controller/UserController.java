package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.user.LoginRequestDTO;
import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;
import com.fivenonjangi.noning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity signupUser(@RequestBody SignupRequestDTO signupRequestDTO) {
        signupRequestDTO.setPassword(passwordEncoder.encode(signupRequestDTO.getPassword()));
        userService.signupUser(signupRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profiles")
    public ResponseEntity<?> getUserData(long userId){
        return new ResponseEntity<>(userService.getUserDataDto(userId),HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){
        UserDataDTO userDataDTO = userService.getUserByEmail(loginRequestDTO.getEmail()).toDTO();
        if (passwordEncoder.matches(loginRequestDTO.getPassword(), userDataDTO.getPassword())){
            UserResponseDTO userResponseDTO = userService.login(userDataDTO.getUser().getId(), loginRequestDTO.getPassword(), LocalDateTime.now());
            if (userResponseDTO != null) {
                Authentication authentication = new UsernamePasswordAuthenticationToken(userResponseDTO.getId(), loginRequestDTO.getPassword());
                String accessToken = jwtTokenProvider.createAccessToken(userResponseDTO.getId());
                String refreshToken = jwtTokenProvider.createRefreshToken(userResponseDTO.getId());
                userResponseDTO.setAccessToken(accessToken);
                return ResponseEntity.ok().header("ACCESSTOKEN", accessToken).header("REFRESHTOKEN", refreshToken).body(userResponseDTO);
            }
        }
        return new ResponseEntity<>("invalid ID",HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        String accesstoken = jwtTokenProvider.resolveToken(request, "ACCESSTOKEN");
        jwtTokenProvider.logout(accesstoken, jwtTokenProvider.getUserPk(accesstoken));
        return ResponseEntity.ok().build();
    }
}
