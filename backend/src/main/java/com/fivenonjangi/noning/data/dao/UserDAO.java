package com.fivenonjangi.noning.data.dao;


import com.fivenonjangi.noning.data.entity.User;
import com.fivenonjangi.noning.data.entity.UserData;

public interface UserDAO {
    public User saveUser(User user);
    public UserData saveUserData(UserData userData);
    public User getUser(long userId);
    public UserData getUserData(long userId);
}
