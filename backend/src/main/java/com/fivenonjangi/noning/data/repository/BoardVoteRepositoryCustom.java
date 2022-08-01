package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.user.VoterResponseDTO;

import java.util.List;

public interface BoardVoteRepositoryCustom {
    List<VoterResponseDTO> findByBoardId(long boardId);
}
