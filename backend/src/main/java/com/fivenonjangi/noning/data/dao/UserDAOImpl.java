package com.fivenonjangi.noning.data.dao;

import com.fivenonjangi.noning.data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDAOImpl implements UserDAO {
    @Override
    public User saveUser(User userEntity) {
        return null;
    }

    @Override
    public User getUser(long userId) {
        return null;
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
