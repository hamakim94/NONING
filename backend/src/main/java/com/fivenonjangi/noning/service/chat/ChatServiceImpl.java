package com.fivenonjangi.noning.service.chat;

import com.fivenonjangi.noning.data.dto.chat.ChatRoomResponseDTO;
import com.fivenonjangi.noning.data.entity.chat.ChatRoom;
import com.fivenonjangi.noning.data.repository.chat.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatServiceImpl implements ChatService{
    private final ChatRoomRepository chatRoomRepository;

    @Override
    public ChatRoomResponseDTO enterRoom(long boardId, byte vote) {
        ChatRoom chatRoom = chatRoomRepository.findByBoardIdEquals(boardId);
        if (chatRoom==null) chatRoom = ChatRoom.builder().boardId(boardId).build();
        chatRoom.enter(vote);
        chatRoom = chatRoomRepository.save(chatRoom);
        return ChatRoomResponseDTO.builder()
                .opt1(chatRoom.getOpt1())
                .opt2(chatRoom.getOpt2())
                .build();
    }

    @Override
    public ChatRoomResponseDTO leaveRoom(long boardId, byte vote) throws Exception {
        ChatRoom chatRoom = chatRoomRepository.findByBoardIdEquals(boardId);
        if (chatRoom==null) throw new Exception();
        chatRoom.leave(vote);
        chatRoom = chatRoomRepository.save(chatRoom);
        return ChatRoomResponseDTO.builder()
                .opt1(chatRoom.getOpt1())
                .opt2(chatRoom.getOpt2())
                .build();
    }

    @Override
    public ChatRoomResponseDTO betray(long boardId, byte vote) throws Exception {
        ChatRoom chatRoom = chatRoomRepository.findByBoardIdEquals(boardId);
        if (chatRoom==null) throw new Exception();
        chatRoom.betray(vote);
        chatRoom = chatRoomRepository.save(chatRoom);
        return ChatRoomResponseDTO.builder()
                .opt1(chatRoom.getOpt1())
                .opt2(chatRoom.getOpt2())
                .build();
    }

    @Override
    public void deleteRoom(long boardId) {
        chatRoomRepository.deleteByBoardId(boardId);
    }
}
