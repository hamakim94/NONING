package com.fivenonjangi.noning.service.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;

import java.util.List;

public interface CommentService {
    void writeComment(long boardId, CommentRequestDTO commentRequestDTO, long userId);
    void deleteComment(long userId, long commentId) throws Exception;
    List<CommentResponseDTO> getCommentList(long boardId, long userId);
    List<CommentResponseDTO> getNestedCommentList(long commentId, long userId);
    void likeComment(long commentId, long userId) throws Exception;
    void dislikeComment(long commentId, long userId) throws Exception;
}
