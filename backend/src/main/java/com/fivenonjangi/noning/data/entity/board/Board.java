package com.fivenonjangi.noning.data.entity.board;

import com.fivenonjangi.noning.data.dto.board.BoardDTO;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "board")
public class Board {
    @Id
    @Column(name = "board_id")
    long id;
    String title;
    String opt1;
    String opt2;
    @Column(name = "category_code")
    String categoryCode;
    LocalDateTime reg;
    @Column(name = "is_deleted")
    boolean isDeleted;
    @Column(name = "is_live")
    boolean isLive;
    @Column(name = "writer_id")
    long writerId;
    @Column(name = "live_id")
    long liveId;

    public BoardDTO toDto(){
        return BoardDTO.builder()
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
