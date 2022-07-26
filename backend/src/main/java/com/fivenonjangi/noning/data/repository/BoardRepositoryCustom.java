package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;

import java.util.List;

public interface BoardRepositoryCustom {
    public List<BoardResponseDTO> findBoardResponseDTObyUserIdCateCode(long userId, String categoryCode);
}
