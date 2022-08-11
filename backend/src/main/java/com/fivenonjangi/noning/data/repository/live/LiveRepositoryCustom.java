package com.fivenonjangi.noning.data.repository.live;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.live.LiveResponseDTO;

import java.util.List;

public interface LiveRepositoryCustom {
    List<LiveResponseDTO> findByUserIdAndCateCode(long userId, String categoryCode);
}
