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
    public void deleteComment(long userId, long commentId) throws Exception{
        Comment comment = commentRepository.findByIdAndWriter_Id(commentId, userId);
        if(comment == null) throw new Exception();
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
    public void likeComment(long commentId, long userId) throws Exception{
        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.getReferenceById(userId);

        CommentData commentData = commentDataRepository.findByComment_Id(commentId);
        if(commentData == null) throw new Exception();
        CommentLike commentLike = commentLikeRepository.findByComment_IdAndUser_Id(commentId, userId);

        if(commentLike == null){ // 중립 -> 좋아요
            CommentLike newCommentLike = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .isLike(true)
                    .build();

            commentLikeRepository.save(newCommentLike);

            // comment_data 업데이트 (likes+1)
            commentData.like(0); // 0: X(중립) → 좋아요
            commentDataRepository.save(commentData);
        } else if(commentLike.isLike() == false) { // 싫어요 -> 좋아요
            commentLike.like();
            commentLikeRepository.save(commentLike);

            // comment_data 업데이트 (dislikes-1, likes+1)
            commentData.like(1); // 1: 싫어요 → 좋아요
            commentDataRepository.save(commentData);
        } else { // 좋아요 -> 좋아요 취소
            commentLikeRepository.delete(commentLike);

            // comment_data 업데이트 (likes-1)
            commentData.like(2); // 2: 좋아요 → 좋아요 취소
            commentDataRepository.save(commentData);
        }
    }

    @Override
    public void dislikeComment(long commentId, long userId) throws Exception {
        Comment comment = commentRepository.findById(commentId).get();
        User user = userRepository.getReferenceById(userId);

        CommentData commentData = commentDataRepository.findByComment_Id(commentId);
        if(commentData == null) throw new Exception();
        CommentLike commentLike = commentLikeRepository.findByComment_IdAndUser_Id(commentId, userId);

        if(commentLike == null){ // 중립 -> 싫어요
            CommentLike newCommentLike = CommentLike.builder()
                    .comment(comment)
                    .user(user)
                    .isLike(false)
                    .build();

            commentLikeRepository.save(newCommentLike);

            // comment_data 업데이트 (dislikes+1)
            commentData.dislike(0); // 0: X(중립) → 싫어요
            commentDataRepository.save(commentData);
        } else if(commentLike.isLike() == false) { // 싫어요 -> 싫어요 취소
            commentLikeRepository.delete(commentLike);

            // comment_data 업데이트 (dislikes-1)
            commentData.dislike(1); // 1: 싫어요 → 싫어요 취소
            commentDataRepository.save(commentData);
        } else { // 좋아요 → 싫어요
            commentLike.dislike();
            commentLikeRepository.save(commentLike);

            // comment_data 업데이트 (dislikes+1, likes-1)
            commentData.dislike(2); // 2: 좋아요 → 싫어요
            commentDataRepository.save(commentData);
        }
    }
}