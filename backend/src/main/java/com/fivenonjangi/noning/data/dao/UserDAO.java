package com.fivenonjangi.noning.data.dao;


import com.fivenonjangi.noning.data.entity.User;

public interface UserDAO {
    public User saveUser(User userEntity);
    public User getUser(long userId);
}
