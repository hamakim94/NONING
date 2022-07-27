package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.entity.comment.CommentData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentDataRepository extends JpaRepository<CommentData, Long> {
}
