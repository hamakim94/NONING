package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.service.BoardService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
//        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
//        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
//        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })
@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private final BoardService boardService;
    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @PostMapping("/write")
    public ResponseEntity writeBoard(@RequestBody BoardRequestDTO boardRequestDTO){
        boardService.writeBoard(boardRequestDTO);
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

    @GetMapping("/{boardid}/detail")
    public ResponseEntity getBoardDetail(@PathVariable("boardid") long boardId){

        return null;
    }
}
