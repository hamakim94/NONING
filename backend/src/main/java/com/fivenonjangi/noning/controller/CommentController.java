package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.data.dto.comment.CommentRequestDTO;
import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;
import com.fivenonjangi.noning.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards/{boardid}/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/write")
    public ResponseEntity writeComment(@PathVariable("boardid") long boardId, @RequestBody CommentRequestDTO commentRequestDTO){
        commentService.writeComment(boardId, commentRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{commentid}/delete")
    public ResponseEntity deleteComment(@PathVariable("boardid") long boardId, @PathVariable("commentid") long commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity getCommentList(@PathVariable("boardid") long boardId, long userId){
        List<CommentResponseDTO> commentResponseDTOList = commentService.getCommentList(boardId, userId);
        return new ResponseEntity<>(commentResponseDTOList, HttpStatus.OK);
    }

    @GetMapping("/{commentid}/list")
    public ResponseEntity getNestedCommentList(@PathVariable("boardid") long boardId, @PathVariable("commentid") long commentId, long userId){
        List<CommentResponseDTO> commentResponseDTOList = commentService.getNestedCommentList(boardId, commentId, userId);
        return new ResponseEntity<>(commentResponseDTOList, HttpStatus.OK);
    }
}
