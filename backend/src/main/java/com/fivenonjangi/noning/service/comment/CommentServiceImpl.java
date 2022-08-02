package com.fivenonjangi.noning.service.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.comment.Comment;
import com.fivenonjangi.noning.data.entity.comment.CommentData;
import com.fivenonjangi.noning.data.entity.comment.CommentLike;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.board.BoardRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentDataRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentLikeRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentRepositoryCustom;
import com.fivenonjangi.noning.data.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<CommentResponseDTO> getNestedCommentList(long commentId, long userId) {
        return commentRepositoryCustom.findByCommentId(commentId, userId);
    }

    @Override
    public void likeComment(long commentId, long userId, byte commentLikeCode) {
        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.findById(userId).get();

        if(commentLikeCode == 0){ // X(중립) → 좋아요
            CommentLike commentLike = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .isLike(true)
                    .build();

            commentLikeRepository.save(commentLike);

            // comment_data 업데이트 (likes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.like(0);

            commentDataRepository.save(commentData);
        } else if(commentLikeCode == 1) { // 싫어요 → 좋아요
            Optional<CommentLike> commentLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);

            commentLike.get().like();
            commentLikeRepository.save(commentLike.get());

            // comment_data 업데이트 (dislikes-1, likes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.like(1);

            commentDataRepository.save(commentData);
        } else if(commentLikeCode == 2) { // 좋아요 → 좋아요 취소
            Optional<CommentLike> commentLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);

            commentLikeRepository.delete(commentLike.get());

            // comment_data 업데이트 (likes-1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.like(2);

            commentDataRepository.save(commentData);
        }
    }

    @Override
    public void dislikeComment(long commentId, long userId, byte commentDislikeCode) {
        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.findById(userId).get();

//        0: X(중립) → 싫어요
//        1: 싫어요 → 싫어요 취소
//        2: 좋아요 → 싫어요
        if(commentDislikeCode == 0){ // X(중립) → 싫어요
            CommentLike commentLike = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .isLike(false)
                    .build();

            commentLikeRepository.save(commentLike);

            // comment_data 업데이트 (dislikes+1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.dislike(0);

            commentDataRepository.save(commentData);
        } else if(commentDislikeCode == 1){ // 싫어요 → 싫어요 취소
            Optional<CommentLike> commentLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);

            commentLikeRepository.delete(commentLike.get());

            // comment_data 업데이트 (dislikes-1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.dislike(1);

            commentDataRepository.save(commentData);
        } else if(commentDislikeCode == 2){ // 좋아요 → 싫어요
            Optional<CommentLike> commentLike = commentLikeRepository.findByCommentIdAndUserId(commentId, userId);

            commentLike.get().dislike();
            commentLikeRepository.save(commentLike.get());

            // comment_data 업데이트 (dislikes+1, likes-1)
            CommentData commentData = commentDataRepository.findByCommentId(commentId).get();
            commentData.dislike(2);

            commentDataRepository.save(commentData);
        }
    }
}