package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.entity.user.Follow;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
//    List<User> findByUser_Id(long userId);
    @Transactional
    void deleteFollowByFromUserIdEqualsAndToUserIdEquals(long fromUserId, long toUserId);
    Follow findByFromUserIdEqualsAndToUserIdEquals(long fromUserId, long toUserId);
}
