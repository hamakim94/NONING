package com.fivenonjangi.noning.data.repository.board;

import com.fivenonjangi.noning.data.dto.user.VoterResponseDTO;

import java.util.List;

public interface BoardVoteRepositoryCustom {
    List<VoterResponseDTO> findByBoardId(long boardId);
}
