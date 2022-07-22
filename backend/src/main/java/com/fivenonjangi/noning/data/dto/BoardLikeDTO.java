package com.fivenonjangi.noning.data.dto;

import com.fivenonjangi.noning.data.entity.BoardLike;
import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

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
    private Timestamp reg;

    public BoardLike toEntity() {
        return BoardLike.builder()
                .id(id)
                .boardId(boardId)
                .userId(userId)
                .reg(reg)
                .build();
    }
}

