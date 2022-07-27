package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.comment.Comment;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentServiceImpl implements CommentService{
    public final CommentRepository commentRepository;
    public final BoardRepository boardRepository;
    public final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, BoardRepository boardRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void writeComment(long boardId, CommentRequestDTO commentRequestDTO) {
        Board board = boardRepository.getReferenceById(boardId);
        User user = userRepository.getReferenceById(commentRequestDTO.getWriterId());

        Comment comment = Comment.builder()
                .content(commentRequestDTO.getContent())
                .level(commentRequestDTO.getLevel())
                .reg(LocalDateTime.now())
                .writer(user)
                .board(board)
                .parentId(commentRequestDTO.getParentId()==0 ? null : commentRequestDTO.getParentId())
                .build();

        commentRepository.save(comment);
    }
}
