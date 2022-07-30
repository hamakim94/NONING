package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.entity.user.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
    public UserData findByUser_Id(long id);
    public UserData findByEmail(String email);
    public UserData findByEmailOrNickname(String email, String nickname);
}
