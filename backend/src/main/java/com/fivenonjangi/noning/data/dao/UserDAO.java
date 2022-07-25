package com.fivenonjangi.noning.data.dao;


import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;

import java.time.LocalDateTime;

public interface UserDAO {
    public User saveUser(User user);
    public UserData saveUserData(UserData userData);
    public User getUser(long userId);
    public UserData getUserData(long userId);
    public UserData findByEmail(String email);
    User login(User user, LocalDateTime curTime);
}
