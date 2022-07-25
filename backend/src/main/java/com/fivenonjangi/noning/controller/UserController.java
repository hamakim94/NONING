package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;
import com.fivenonjangi.noning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity signupUser(@RequestBody SignupRequestDTO signupRequestDTO) {

        userService.signupUser(signupRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profiles")
    public ResponseEntity<?> getUserData(long userId){
        return new ResponseEntity<>(userService.getUserDataDto(userId),HttpStatus.OK);
    }

    @GetMapping("/api/users/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password){
        UserResponseDTO userResponseDTO = userService.login(email, password, LocalDateTime.now());
        if (userResponseDTO == null) {
            return new ResponseEntity<>("invalid ID",HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }
}
