package com.fivenonjangi.noning.service.board;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.board.BoardData;
import com.fivenonjangi.noning.data.entity.board.BoardLike;
import com.fivenonjangi.noning.data.entity.board.BoardVote;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.board.*;
import com.fivenonjangi.noning.data.repository.user.UserRepository;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class BoardServiceImpl implements BoardService{
    public final BoardRepository boardRepository;
    public final BoardDataRepository boardDataRepository;
    public final BoardRepositoryCustom boardRepositoryCustom;
    public final UserRepository userRepository;
    public final BoardVoteRepository boardVoteRepository;
    public final BoardLikeRepository boardLikeRepository;

    @Override
    public void writeBoard(BoardRequestDTO boardRequestDTO, long userId){
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
    public void deleteBoard(long userId, long boardId) throws Exception {
        Board board = boardRepository.findByIdAndWriter_Id(boardId, userId);
        if(board == null) throw new Exception(); // 삭제할 게시글이 존재하지 않으면 X
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

    @Override
    public void vote(long boardId, long userId, byte vote, LocalDateTime now) throws Exception {
        if (boardVoteRepository.findByBoard_IdAndUser_Id(boardId, userId) !=null) throw new Exception();
        BoardData boardData = boardDataRepository.findByBoard_Id(boardId);
        BoardVote boardVote = BoardVote.builder()
                .vote(vote)
                .board(boardRepository.getReferenceById(boardId))
                .user(userRepository.getReferenceById(userId))
                .reg(now)
                .build();
        boardVoteRepository.save(boardVote);
        boardData.updateVote(vote, false);
        boardDataRepository.save(boardData);
    }

    @Override
    public Map<String, Integer> betray(long boardId, long userId, byte vote, LocalDateTime now) throws Exception {
        BoardData boardData = boardDataRepository.findByBoard_Id(boardId);
        BoardVote boardVote = boardVoteRepository.findByBoard_IdAndUser_Id(boardId, userId);
        if (boardVote.getVote() == vote) throw new Exception();
        boardVote.updateVote(vote, now);
        boardVoteRepository.save(boardVote);
        boardData.updateVote(vote, true);
        boardDataRepository.save(boardData);
        Map<String, Integer> map = new HashMap<>();
        map.put("opt1", boardData.getOpt1Selected());
        map.put("opt2",boardData.getOpt2Selected());
        return map;
    }

    @Override
    public void like(long boardId, long userId, LocalDateTime now) throws Exception {
        if (boardLikeRepository.findByBoard_IdAndUser_Id(boardId, userId) != null) throw new Exception();
        BoardData boardData = boardDataRepository.findByBoard_Id(boardId);
        BoardLike boardLike = BoardLike.builder()
                .board(boardRepository.getReferenceById(boardId))
                .user(userRepository.getReferenceById(userId))
                .reg(now)
                .build();
        boardLikeRepository.save(boardLike);
        boardData.like();
        boardDataRepository.save(boardData);
    }

    @Override
    public void unlike(long boardId, long userId) throws Exception {
        if (boardLikeRepository.findByBoard_IdAndUser_Id(boardId, userId) == null) throw new Exception();
        BoardData boardData = boardDataRepository.findByBoard_Id(boardId);
        boardLikeRepository.deleteBoardLikeByBoard_IdAndUser_Id(boardId, userId);
        boardData.unlike();
        boardDataRepository.save(boardData);
    }

    @Override
    public List<BoardResponseDTO> getFlowList(long userId) {
        return boardRepositoryCustom.findFlowByUserId(userId);
    }
}
