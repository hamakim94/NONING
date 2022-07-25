package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dao.UserDAO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private final UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    @Override
    public void saveUser(UserDTO userDTO, UserDataDTO userDataDTO) {
        User user = userDAO.saveUser(userDTO.toEntity());
        UserData userData = userDataDTO.toEntity();
        userData.setUser(user);
        System.out.println("UserID : "+user.getId());
        userDAO.saveUserData(userData);
    }

    @Override
    public UserDTO getUser(long userId) {
        return userDAO.getUser(userId).toDto();
    }

    @Override
    public UserDataDTO getUserDataDto(long userId) {
        UserData  userData = userDAO.getUserData(userId);
        System.out.println("UserID : "+userData.getUser().getId());
        return userData.toDTO();
    }
}
