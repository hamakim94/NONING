package com.fivenonjangi.noning.service.chat;

import com.fivenonjangi.noning.data.dto.chat.ChatRoomResponseDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.chat.ChatRoom;
import com.fivenonjangi.noning.data.repository.board.BoardRepository;
import com.fivenonjangi.noning.data.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService{
    private final ChatRoomRepository chatRoomRepository;
    private final BoardRepository boardRepository;

    @Override
    public ChatRoomResponseDTO enterRoom(long boardId, byte vote) {
        Board board = boardRepository.getReferenceById(boardId);
        ChatRoom chatRoom = chatRoomRepository.findByBoardIdEquals(boardId);
        boolean isNew = false;
        if (chatRoom==null) {
            chatRoom = ChatRoom.builder().board(board).build();
            isNew = true;
        }
        chatRoom.enter(vote);
        chatRoom = chatRoomRepository.save(chatRoom);
        if (isNew) {
            board.openLive(chatRoom.getId());
            boardRepository.save(board);
        }
        return ChatRoomResponseDTO.builder()
                .opt1Selected(chatRoom.getOpt1Selected())
                .opt2Selected(chatRoom.getOpt2Selected())
                .build();
    }

    @Override
    public ChatRoomResponseDTO leaveRoom(long boardId, byte vote) throws Exception {
        ChatRoom chatRoom = chatRoomRepository.findByBoardIdEquals(boardId);
        if (chatRoom==null) throw new Exception();
        chatRoom.leave(vote);
        chatRoom = chatRoomRepository.save(chatRoom);
        return ChatRoomResponseDTO.builder()
                .opt1Selected(chatRoom.getOpt1Selected())
                .opt2Selected(chatRoom.getOpt2Selected())
                .build();
    }

    @Override
    public ChatRoomResponseDTO betray(long boardId, byte vote) throws Exception {
        ChatRoom chatRoom = chatRoomRepository.findByBoardIdEquals(boardId);
        if (chatRoom==null) throw new Exception();
        chatRoom.betray(vote);
        chatRoom = chatRoomRepository.save(chatRoom);
        return ChatRoomResponseDTO.builder()
                .opt1Selected(chatRoom.getOpt1Selected())
                .opt2Selected(chatRoom.getOpt2Selected())
                .build();
    }

    @Override
    public void deleteRoom(long boardId) {
        chatRoomRepository.deleteByBoardId(boardId);
        Board board = boardRepository.findById(boardId).get();
        board.closeLive();
        boardRepository.save(board);
    }
}
