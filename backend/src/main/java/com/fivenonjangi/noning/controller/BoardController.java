package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.user.VoterResponseDTO;
import com.fivenonjangi.noning.service.BoardService;
import com.fivenonjangi.noning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
        List<BoardResponseDTO> boardResponseDTOList = boardService.getBoardList(userId, categoryCode);

        return new ResponseEntity<>(boardResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/{boardid}")
    public ResponseEntity getBoardDetail(HttpServletRequest request, @PathVariable("boardid") long boardId){
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
        BoardResponseDTO boardResponseDTO = boardService.getBoard(userId, boardId);

//        Map<String, List<UserResponseDTO>> participates = boardService.getParticipate(boardId);
//        Map<String, Object> result = new HashMap<>();
//        result.put("participate1List", participates.get("participate1List"));
//        result.put("participate2List", participates.get("participate2List"));
//        result.put("board", boardResponseDTO);

        return new ResponseEntity<>(boardResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/{boardid}/users")
    public ResponseEntity getVoter(@PathVariable("boardid") long boardId){
        List<VoterResponseDTO> voterList = userService.getVoterListByBoardId(boardId);

        return new ResponseEntity<>(voterList, HttpStatus.OK);
    }
}
