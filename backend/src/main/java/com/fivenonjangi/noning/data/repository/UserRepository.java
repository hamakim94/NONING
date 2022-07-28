package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
