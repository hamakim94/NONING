package com.fivenonjangi.noning.data.repository.comment;

import com.fivenonjangi.noning.data.entity.comment.CommentData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentDataRepository extends JpaRepository<CommentData, Long> {
    Optional<CommentData> findByCommentId(long commentId);
}
