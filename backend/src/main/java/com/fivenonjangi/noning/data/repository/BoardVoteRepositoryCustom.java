package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.user.ParticipateResponseDTO;
import com.fivenonjangi.noning.data.entity.board.BoardVote;

import java.util.List;

public interface BoardVoteRepositoryCustom {
    List<ParticipateResponseDTO> findByBoardId(long boardId);
}
