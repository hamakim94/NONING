package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;
import com.fivenonjangi.noning.data.entity.user.UserData;

import java.time.LocalDateTime;

public interface UserService {

    void signupUser(SignupRequestDTO signupRequestDTO);
    UserDTO getUser(long userId);
    UserDataDTO getUserDataDto(long userId);
    UserResponseDTO login(Long userId, String password, LocalDateTime curTime);
    UserData getUserByEmail(String email);
    UserData getUserById(long id);
}
