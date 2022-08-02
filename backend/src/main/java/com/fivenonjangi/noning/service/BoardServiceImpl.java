package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.board.BoardData;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService{
    public final BoardRepository boardRepository;
    public final BoardDataRepository boardDataRepository;
    public final BoardRepositoryCustom boardRepositoryCustom;
    public final UserRepository userRepository;

    @Autowired
    public BoardServiceImpl(BoardRepository boardRepository, BoardDataRepository boardDataRepository, BoardRepositoryCustom boardRepositoryCustom, UserRepository userRepository) {
        this.boardRepository = boardRepository;
        this.boardDataRepository = boardDataRepository;
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

        // board_data
        BoardData boardData = BoardData.builder()
                .opt1Selected(0)
                .opt2Selected(0)
                .likes(0)
                .board(board)
                .build();

        boardDataRepository.save(boardData);
    }

    @Override
    public void deleteBoard(long boardId) {
        Board board = boardRepository.findById(boardId).get();
        board.deleteBoard();

        boardRepository.save(board);
    }

    @Override
    public List<BoardResponseDTO> getBoardList(long userId, String categoryCode) {
        List<BoardResponseDTO> boardResponseDTOList;

        if(userId == -1){ // 로그인 안한 사용자
            boardResponseDTOList = boardRepositoryCustom.findByCateCode(categoryCode);
        } else { // 로그인 한 사용자
            boardResponseDTOList = boardRepositoryCustom.findByUserIdAndCateCode(userId, categoryCode);
        }
        return boardResponseDTOList;
    }

    @Override
    public List<BoardResponseDTO> getBoardListByUserId(long userId) {
        return boardRepositoryCustom.findByUserId(userId);
    }

    @Override
    public BoardResponseDTO getBoard(long userId, long boardId) {
        return boardRepositoryCustom.findByUserIdAndBoardId(userId, boardId);
    }
}
