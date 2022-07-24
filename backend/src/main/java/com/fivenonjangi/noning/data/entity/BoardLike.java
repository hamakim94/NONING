package com.fivenonjangi.noning.data.entity;


import com.fivenonjangi.noning.data.dto.BoardLikeDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board_like")
public class BoardLike {
    @Id
    @Column(name = "board_like_id")
    long id;
    @Column(name = "board_id")
    long boardId;
    @Column(name = "user_id")
    long userId;
    Timestamp reg;

    public BoardLikeDTO toDto() {
        return BoardLikeDTO.builder()
                .id(id)
                .boardId(boardId)
                .userId(userId)
                .reg(reg)
                .build();
    }
}

