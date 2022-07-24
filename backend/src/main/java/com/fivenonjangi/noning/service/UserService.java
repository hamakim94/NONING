package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.UserDTO;
import com.fivenonjangi.noning.data.dto.UserDataDTO;

public interface UserService {

    void saveUser(UserDTO userDTO, UserDataDTO userDataDTO);
    UserDTO getUser(long userId);
    UserDataDTO getUserDataDto(long userId);
}
