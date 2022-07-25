package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;

public interface UserService {

    void saveUser(SignupRequestDTO signupRequestDTO);
    UserDTO getUser(long userId);
    UserDataDTO getUserDataDto(long userId);
}
