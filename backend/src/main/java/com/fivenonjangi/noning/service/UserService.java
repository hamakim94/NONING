package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.*;
import com.fivenonjangi.noning.data.entity.user.UserData;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {
    void signupUser(SignupRequestDTO signupRequestDTO) throws Exception;
    UserResponseDTO login(LoginRequestDTO loginRequestDTO, LocalDateTime curTime, PasswordEncoder passwordEncoder);
    UserData getUserByEmail(String email);
    UserData getUserById(long id);
    List<ParticipateResponseDTO> getUserListByBoardId(long boardId);
    UserResponseDTO getUserResponse(long userId);
}
