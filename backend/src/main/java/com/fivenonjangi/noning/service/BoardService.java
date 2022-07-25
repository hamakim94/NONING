package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;

public interface BoardService {
    void writeBoard(BoardRequestDTO boardRequestDTO);
    void deleteBoard(long boardId);
}
