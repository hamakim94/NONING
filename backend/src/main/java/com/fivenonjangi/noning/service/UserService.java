package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;

import java.time.LocalDateTime;

public interface UserService {

    void signupUser(SignupRequestDTO signupRequestDTO);
    UserDTO getUser(long userId);
    UserDataDTO getUserDataDto(long userId);

    UserResponseDTO login(String email, String password, LocalDateTime curTime);
}
