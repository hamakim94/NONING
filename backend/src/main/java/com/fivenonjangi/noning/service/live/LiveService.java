package com.fivenonjangi.noning.service.live;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.live.LiveResponseDTO;

import java.util.List;

public interface LiveService {
    List<LiveResponseDTO> getLiveList(long userId, String categoryCode);
}
