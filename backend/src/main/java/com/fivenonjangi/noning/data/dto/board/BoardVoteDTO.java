package com.fivenonjangi.noning.data.dto.board;


import com.fivenonjangi.noning.data.entity.board.BoardVote;
import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class BoardVoteDTO {
    private long id;
    private boolean vote;
    private long boardId;
    private long userId;
    private Timestamp reg;

    public BoardVote toEntity() {
        return BoardVote.builder()
                .id(id)
                .vote(vote)
                .boardId(boardId)
                .userId(userId)
                .reg(reg)
                .build();
    }
}

