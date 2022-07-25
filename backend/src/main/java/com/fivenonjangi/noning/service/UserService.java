package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;

public interface UserService {

    void saveUser(UserDTO userDTO, UserDataDTO userDataDTO);
    UserDTO getUser(long userId);
    UserDataDTO getUserDataDto(long userId);
}
