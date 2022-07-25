package com.fivenonjangi.noning.data.dto.board;


import com.fivenonjangi.noning.data.entity.board.Board;
import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class BoardDTO {
    private long id;
    private String title;
    private String opt1;
    private String opt2;
    private String categoryCode;
    private Timestamp reg;
    private boolean isDeleted;
    private boolean isLive;
    private long writerId;
    private long liveId;

    public Board toEntity() {
        return Board.builder()
                .id(id)
                .title(title)
                .opt1(opt1)
                .opt2(opt2)
                .categoryCode(categoryCode)
                .reg(reg)
                .isDeleted(isDeleted)
                .isLive(isLive)
                .writerId(writerId)
                .liveId(liveId)
                .build();
    }
}
