package com.fivenonjangi.noning.service.chat;

import com.fivenonjangi.noning.data.dto.chat.ChatRoomResponseDTO;

public interface ChatService {
    ChatRoomResponseDTO enterRoom(long boardId, byte vote);
    ChatRoomResponseDTO leaveRoom(long boardId, byte vote) throws Exception;
    ChatRoomResponseDTO betray(long boardId, byte vote) throws Exception;
    void deleteRoom(long boardId);

}
