package com.fivenonjangi.noning.data.dto.board;


import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.board.BoardVote;
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
public class BoardVoteDTO {
    private long id;
    private boolean vote;
    private BoardDTO board;
    private UserDTO user;
    private LocalDateTime reg;

    public BoardVote toEntity() {
        return BoardVote.builder()
                .id(id)
                .vote(vote)
                .board(board.toEntity())
                .user(user.toEntity())
                .reg(reg)
                .build();
    }
}

