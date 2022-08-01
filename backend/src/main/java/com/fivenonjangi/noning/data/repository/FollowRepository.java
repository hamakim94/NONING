package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.entity.user.Follow;
import com.fivenonjangi.noning.data.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
//    List<User> findByUser_Id(long userId);
}
