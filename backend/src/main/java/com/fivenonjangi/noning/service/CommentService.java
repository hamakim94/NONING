package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;

public interface CommentService {
    void writeComment(long boardId, CommentRequestDTO commentRequestDTO);
}
