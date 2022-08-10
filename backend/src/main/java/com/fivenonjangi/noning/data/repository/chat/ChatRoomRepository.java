package com.fivenonjangi.noning.data.repository.chat;

import com.fivenonjangi.noning.data.entity.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoom findByBoardIdEquals(long boardId);
    @Transactional
    void deleteByBoardId(long boardId);
}
