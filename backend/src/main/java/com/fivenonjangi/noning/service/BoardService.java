package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;

import java.util.List;

public interface BoardService {
    void writeBoard(BoardRequestDTO boardRequestDTO, long userId);
    void deleteBoard(long boardId);
    BoardResponseDTO getBoard(long userId, long boardId);
    List<BoardResponseDTO> getBoardList(long userId, String categoryCode);
//    Map<String, List<UserResponseDTO>> getParticipate(long boardId);
    List<BoardResponseDTO> getBoardListByUserId(long userId);
}