package com.fivenonjangi.noning.data.repository.board;

import com.fivenonjangi.noning.data.entity.board.BoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {
    BoardLike findByBoard_IdAndUser_Id(long boardId, long userId);
    @Transactional
    void deleteBoardLikeByBoard_IdAndUser_Id(long boardId, long userId);
}
