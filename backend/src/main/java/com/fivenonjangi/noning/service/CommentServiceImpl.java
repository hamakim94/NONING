package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.comment.Comment;
import com.fivenonjangi.noning.data.entity.comment.CommentData;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
    public final CommentRepository commentRepository;
    public final BoardRepository boardRepository;
    public final UserRepository userRepository;
    public final CommentRepositoryCustom commentRepositoryCustom;
    public final CommentDataRepository commentDataRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, BoardRepository boardRepository, UserRepository userRepository, CommentRepositoryCustom commentRepositoryCustom, CommentDataRepository commentDataRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.commentRepositoryCustom = commentRepositoryCustom;
        this.commentDataRepository = commentDataRepository;
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

        // comment_data
        CommentData commentData = CommentData.builder()
                .comment(comment)
                .build();

        commentDataRepository.save(commentData);
    }
    @Override
    public void deleteComment(long commentId){
        Comment comment = commentRepository.findById(commentId).get();
        comment.deleteComment();

        commentRepository.save(comment);
    }

    @Override
    public List<CommentResponseDTO> getCommentList(long boardId, long userId) {
        return commentRepositoryCustom.findCommentResponseDTObyBoardId(boardId, userId);
    }

    @Override
    public List<CommentResponseDTO> getNestedCommentList(long boardId, long commentId, long userId) {
        return commentRepositoryCustom.findCommentResponseDTObyCommentId(boardId, commentId, userId);
    }
}