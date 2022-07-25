package com.fivenonjangi.noning.data.dto.board;

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
    private long boardId;
    private long userId;
    private LocalDateTime reg;

    public BoardLike toEntity() {
        return BoardLike.builder()
                .id(id)
                .boardId(boardId)
                .userId(userId)
                .reg(reg)
                .build();
    }
}

