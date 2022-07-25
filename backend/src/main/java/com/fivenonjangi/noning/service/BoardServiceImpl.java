package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.BoardRepository;
import com.fivenonjangi.noning.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BoardServiceImpl implements BoardService{
    public final BoardRepository boardRepository;
    public final UserRepository userRepository;

    public BoardServiceImpl(BoardRepository boardRepository, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void writeBoard(BoardRequestDTO boardRequestDTO) {
        User user = userRepository.getReferenceById(boardRequestDTO.getWriterId());

        Board board = Board.builder()
                .title(boardRequestDTO.getTitle())
                .opt1(boardRequestDTO.getOpt1())
                .opt2(boardRequestDTO.getOpt2())
                .categoryCode(boardRequestDTO.getCategoryCode())
                .reg(LocalDateTime.now())
                .writer(user)
                .build();

        boardRepository.save(board);
    }

    @Override
    public void deleteBoard(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.deleteBoard();

        boardRepository.save(board);
    }
}
