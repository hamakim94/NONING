package com.fivenonjangi.noning.service.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;

import java.util.List;

public interface CommentService {
    void writeComment(long boardId, CommentRequestDTO commentRequestDTO, long userId);
    void deleteComment(long commentId);
    List<CommentResponseDTO> getCommentList(long boardId, long userId);
    List<CommentResponseDTO> getNestedCommentList(long commentId, long userId);
    void likeComment(long commentId, long userId, byte commentLikeCode);
    void dislikeComment(long commentId, long userId, byte commentDislikeCode);
}
