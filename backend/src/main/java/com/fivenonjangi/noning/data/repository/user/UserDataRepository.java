package com.fivenonjangi.noning.data.repository.user;

import com.fivenonjangi.noning.data.entity.user.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
    UserData findByUser_Id(long id);
    @Transactional
    void deleteByUser_Id(long id);
    UserData findByEmail(String email);
    UserData findByEmailOrNickname(String email, String nickname);
}
