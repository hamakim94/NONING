package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/api/boards/{boardid}/delete")
    public ResponseEntity deleteBoard(@PathVariable("boardid") long boardId){
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
