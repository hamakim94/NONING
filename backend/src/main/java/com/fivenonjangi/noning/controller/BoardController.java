package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.service.BoardService;
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
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public BoardController(BoardService boardService, JwtTokenProvider jwtTokenProvider) {
        this.boardService = boardService;
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

    @GetMapping("/list/{userid}")
    public ResponseEntity getBoardList(@PathVariable("userid") long userId, @RequestParam("categorycode") String categoryCode){
        List<BoardResponseDTO> boardResponseDTOList = boardService.getBoardList(userId, categoryCode);

        return new ResponseEntity<>(boardResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/{boardid}")
    public ResponseEntity getBoardDetail(HttpServletRequest request, @PathVariable("boardid") long boardId) {
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
        BoardResponseDTO boardResponseDTO = boardService.getBoard(userId, boardId);

//        Map<String, List<UserResponseDTO>> participates = boardService.getParticipate(boardId);
//        Map<String, Object> result = new HashMap<>();
//        result.put("participate1List", participates.get("participate1List"));
//        result.put("participate2List", participates.get("participate2List"));
//        result.put("board", boardResponseDTO);

        return new ResponseEntity<>(boardResponseDTO, HttpStatus.OK);
    }
}
