package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;

import java.util.List;

public interface BoardService {
    void writeBoard(BoardRequestDTO boardRequestDTO, long userId);
    void deleteBoard(long boardId);
    List<BoardResponseDTO> getBoardList(long userId, String categoryCode);
}
