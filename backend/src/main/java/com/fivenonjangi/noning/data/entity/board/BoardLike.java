package com.fivenonjangi.noning.data.entity.board;


import com.fivenonjangi.noning.data.dto.board.BoardLikeDTO;
import com.fivenonjangi.noning.data.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board_like")
public class BoardLike {
    @Id
    @Column(name = "board_like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @ManyToOne
    @JoinColumn(name = "board_id")
    Board board;
    @OneToOne
    @JoinColumn(name = "user_id")
    User user;
    LocalDateTime reg;

    public BoardLikeDTO toDto() {
        return BoardLikeDTO.builder()
                .id(id)
                .board(board.toDto())
                .user(user.toDto())
                .reg(reg)
                .build();
    }
}

