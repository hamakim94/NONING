package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.user.VoterResponseDTO;
import com.fivenonjangi.noning.service.board.BoardService;
import com.fivenonjangi.noning.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

//@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
//        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
//        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
//        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })
@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private final BoardService boardService;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public BoardController(BoardService boardService, UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.boardService = boardService;
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/write")
    public ResponseEntity writeBoard(HttpServletRequest request, @RequestBody BoardRequestDTO boardRequestDTO){
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
        boardService.writeBoard(boardRequestDTO, userId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{boardid}/delete")
    public ResponseEntity deleteBoard(@PathVariable("boardid") long boardId){
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity getBoardList(HttpServletRequest request, @RequestParam("categorycode") String categoryCode){
        long userId = -1;

        if(request.getHeader("ACCESSTOKEN") != null){ // 로그인 한 사용자
            userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
        }

        List<BoardResponseDTO> boardResponseDTOList = boardService.getBoardList(userId, categoryCode);

        return new ResponseEntity<>(boardResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/{boardid}")
    public ResponseEntity getBoardDetail(HttpServletRequest request, @PathVariable("boardid") long boardId){
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
        BoardResponseDTO boardResponseDTO = boardService.getBoard(userId, boardId);

        return new ResponseEntity<>(boardResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/{boardid}/users")
    public ResponseEntity getVoter(@PathVariable("boardid") long boardId){
        List<VoterResponseDTO> voterList = userService.getVoterListByBoardId(boardId);

        return new ResponseEntity<>(voterList, HttpStatus.OK);
    }

    @PostMapping("/{boardid}/vote")
    public ResponseEntity<?> vote(@PathVariable("boardid") long boardId, @RequestBody BoardRequestDTO.BoardVoteDTO boardVoteDTO, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(boardVoteDTO.getUserId())){
            try {
                boardService.vote(boardId, boardVoteDTO.getUserId(), boardVoteDTO.getVote(), LocalDateTime.now());
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (Exception e){}
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/{boardid}/betray")
    public ResponseEntity<?> betray(@PathVariable("boardid") long boardId, @RequestBody BoardRequestDTO.BoardVoteDTO boardVoteDTO, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(boardVoteDTO.getUserId())){
            try {
                boardService.betray(boardId, boardVoteDTO.getUserId(), boardVoteDTO.getVote(), LocalDateTime.now());
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (Exception e){}
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/{boardid}/like")
    public ResponseEntity<?> like(@PathVariable("boardid") long boardId, @RequestParam long userId, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(userId))){
            try {
                boardService.like(boardId, userId, LocalDateTime.now());
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (Exception e){}
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @DeleteMapping("/{boardid}/unlike")
    public ResponseEntity<?> unlike(@PathVariable("boardid") long boardId, @RequestParam long userId, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(userId))){
            try {
                boardService.unlike(boardId, userId);
                return new ResponseEntity<>(HttpStatus.OK);
            }catch (Exception e){}
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
