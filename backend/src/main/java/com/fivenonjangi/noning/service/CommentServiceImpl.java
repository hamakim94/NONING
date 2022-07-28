package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.comment.Comment;
import com.fivenonjangi.noning.data.entity.comment.CommentData;
import com.fivenonjangi.noning.data.entity.comment.CommentLike;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{
    public final CommentRepository commentRepository;
    public final BoardRepository boardRepository;
    public final UserRepository userRepository;
    public final CommentRepositoryCustom commentRepositoryCustom;
    public final CommentDataRepository commentDataRepository;
    public final CommentLikeRepository commentLikeRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, BoardRepository boardRepository, UserRepository userRepository, CommentRepositoryCustom commentRepositoryCustom, CommentDataRepository commentDataRepository, CommentLikeRepository commentLikeRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
        this.commentRepositoryCustom = commentRepositoryCustom;
        this.commentDataRepository = commentDataRepository;
        this.commentLikeRepository = commentLikeRepository;
    }

    @Override
    public void writeComment(long boardId, CommentRequestDTO commentRequestDTO, long userId) {
        Board board = boardRepository.getReferenceById(boardId);
        User user = userRepository.getReferenceById(userId);

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
        return commentRepositoryCustom.findByBoardId(boardId, userId);
    }

    @Override
    public List<CommentResponseDTO> getNestedCommentList(long boardId, long commentId, long userId) {
        return commentRepositoryCustom.findByCommentId(boardId, commentId, userId);
    }

    @Override
    public void likeComment(long commentId, long userId) {
        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.findById(userId).get();

        // comment_like에 넣거나 업데이트해야
        Optional<CommentLike> commentLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);

        if(!commentLike.isEmpty()){
            commentLike.get().like();
            commentLikeRepository.save(commentLike.get());

            // comment_data 업데이트 (dislikes-1, likes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.like(true);

            commentDataRepository.save(commentData);
        } else {
            CommentLike commentLikeUpdate = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .isLike(true)
                    .build();

            commentLikeRepository.save(commentLikeUpdate);

            // comment_data 업데이트 (likes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.like(false);

            commentDataRepository.save(commentData);
        }
    }

    @Override
    public void dislikeComment(long commentId, long userId) {
        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.findById(userId).get();

        // comment_like에 넣거나 업데이트해야
        Optional<CommentLike> commentLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);

        if(!commentLike.isEmpty()){
            commentLike.get().dislike();
            commentLikeRepository.save(commentLike.get());

            // comment_data 업데이트 (likes-1, dislikes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.dislike(true);

            commentDataRepository.save(commentData);
        }else {
            CommentLike commentLikeUpdate = CommentLike.builder()
                .comment(comment)
                .user(user)
                .isLike(false)
                .build();

            commentLikeRepository.save(commentLikeUpdate);

            // comment_data 업데이트 (dislikes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.dislike(false);

            commentDataRepository.save(commentData);
        }
    }
}