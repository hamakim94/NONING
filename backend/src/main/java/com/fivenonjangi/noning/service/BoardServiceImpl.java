package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.BoardRepository;
import com.fivenonjangi.noning.data.repository.BoardRepositoryCustom;
import com.fivenonjangi.noning.data.repository.BoardRepositoryImpl;
import com.fivenonjangi.noning.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService{
    public final BoardRepository boardRepository;
    public final BoardRepositoryCustom boardRepositoryCustom;
    public final UserRepository userRepository;

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository, BoardRepositoryCustom boardRepositoryCustom, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.boardRepositoryCustom = boardRepositoryCustom;
        this.userRepository = userRepository;
    }

    @Override
    public void writeBoard(BoardRequestDTO boardRequestDTO, long userId) {
        User user = userRepository.getReferenceById(userId);

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

    @Override
    public List<BoardResponseDTO> getBoardList(long userId, String categoryCode) {
        return boardRepositoryCustom.findBoardResponseDTObyUserIdCateCode(userId, categoryCode);
    }
}
