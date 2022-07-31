package com.fivenonjangi.noning.data.repository;


import com.fivenonjangi.noning.data.dto.board.BoardVoteDTO;
import com.fivenonjangi.noning.data.entity.board.BoardVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardVoteRepository extends JpaRepository<BoardVote, Long> {
}
