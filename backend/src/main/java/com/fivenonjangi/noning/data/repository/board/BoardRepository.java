package com.fivenonjangi.noning.data.repository.board;

import com.fivenonjangi.noning.data.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
