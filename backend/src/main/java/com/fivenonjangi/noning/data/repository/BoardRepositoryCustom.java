package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;

import java.util.List;
import java.util.Map;

public interface BoardRepositoryCustom {
    List<BoardResponseDTO> findByUserIdAndCateCode(long userId, String categoryCode);
    BoardResponseDTO findByUserIdAndBoardId(long userId, long boardId);
    Map<String, List<UserResponseDTO>> findByBoardId(long boardId);

}
