package com.fivenonjangi.noning.data.repository;


import com.fivenonjangi.noning.data.entity.board.BoardVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardVoteRepository extends JpaRepository<BoardVote, Long> {
}
