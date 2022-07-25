package com.fivenonjangi.noning.data.dto.board;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.board.BoardLike;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class BoardLikeDTO {
    private long id;
    private BoardDTO board;
    private UserDTO user;
    private LocalDateTime reg;

    public BoardLike toEntity() {
        return BoardLike.builder()
                .id(id)
                .board(board.toEntity())
                .user(user.toEntity())
                .reg(reg)
                .build();
    }
}

