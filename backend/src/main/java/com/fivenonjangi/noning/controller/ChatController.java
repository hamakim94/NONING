package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.data.dto.board.BoardRequestDTO;
import com.fivenonjangi.noning.data.dto.chat.ChatRoomResponseDTO;
import com.fivenonjangi.noning.service.board.BoardService;
import com.fivenonjangi.noning.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chats")
public class ChatController {
    private final ChatService chatService;
    private final BoardService boardService;

    @PostMapping("/enter")
    public ResponseEntity enterRoom(@RequestParam long boardId,@RequestParam byte vote) {
        try {
            ChatRoomResponseDTO chatRoomResponseDTO = chatService.enterRoom(boardId, vote);
            if (chatRoomResponseDTO == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(chatRoomResponseDTO, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/leave")
    public ResponseEntity leaveRoom(long boardId, byte vote) {
        try {
            ChatRoomResponseDTO chatRoomResponseDTO = chatService.leaveRoom(boardId, vote);
            if (chatRoomResponseDTO == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(chatRoomResponseDTO, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity deleteRoom(long boardId) {
        try {
            chatService.deleteRoom(boardId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/{boardid}/betray")
    public ResponseEntity betray(@PathVariable("boardid") long boardId, @RequestBody BoardRequestDTO.BoardVoteDTO boardVoteDTO){
        try {
            Map<String, Integer> result = boardService.betray(boardId, boardVoteDTO.getUserId(), boardVoteDTO.getVote(), LocalDateTime.now());
            chatService.betray(boardId, boardVoteDTO.getVote());
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
