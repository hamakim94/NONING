package com.fivenonjangi.noning.data.repository.comment;

import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
