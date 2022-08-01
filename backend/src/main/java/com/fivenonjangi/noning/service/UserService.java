package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.*;
import com.fivenonjangi.noning.data.entity.user.UserData;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {

    void signupUser(SignupRequestDTO signupRequestDTO) throws Exception;
    UserDTO getUser(long userId);
    UserDataDTO getUserDataDto(long userId);
    UserResponseDTO login(Long userId, String password, LocalDateTime curTime);
    UserData getUserByEmail(String email);
    UserData getUserById(long id);
    List<ParticipateResponseDTO> getUserListByBoardId(long boardId);
}
