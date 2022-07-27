package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;

import java.util.List;

public interface CommentRepositoryCustom {
    List<CommentResponseDTO> findCommentResponseDTObyBoardId(long boardId, long userId); // 댓글
    List<CommentResponseDTO> findCommentResponseDTObyCommentId(long boardId, long commentId, long userId); // 대댓글

}
