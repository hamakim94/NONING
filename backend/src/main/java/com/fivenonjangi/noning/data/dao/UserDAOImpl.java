package com.fivenonjangi.noning.data.dao;

import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;
import com.fivenonjangi.noning.data.repository.UserDataRepository;
import com.fivenonjangi.noning.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDAOImpl implements UserDAO {

    private final UserRepository userRepository;
    private final UserDataRepository userDataRepository;

    @Autowired
    public UserDAOImpl(UserRepository userRepository, UserDataRepository userDataRepository) {
        this.userRepository = userRepository;
        this.userDataRepository = userDataRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserData saveUserData(UserData userData) {
        return userDataRepository.save(userData);
    }

    @Override
    public User getUser(long userId) {
        return null;
    }

    @Override
    public UserData getUserData(long userId) {
        return userDataRepository.findByUser_Id(userId);
    }

//    UserRepository userRepository;
//
//    @Autowired
//    public UserDAOImpl(UserRepository userRepository){
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public User saveUser(User userEntity) {
//        userRepository.save(userEntity);
//        return userEntity;
//    }
//
//    @Override
//    public User getUser(long userId) {
//        User userEntity = userRepository.getReferenceById(userId);
//        return userEntity;
//    }
}
