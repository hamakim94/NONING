package com.fivenonjangi.noning.data.repository.board;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;

import java.util.List;

public interface BoardRepositoryCustom {
    List<BoardResponseDTO> findByUserIdAndCateCode(long userId, String categoryCode);
    List<BoardResponseDTO> findByCateCode(String categoryCode);
    BoardResponseDTO findByUserIdAndBoardId(long userId, long boardId);
    List<BoardResponseDTO> findByUserId(long userId);
}
