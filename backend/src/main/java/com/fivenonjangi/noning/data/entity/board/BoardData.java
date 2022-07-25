package com.fivenonjangi.noning.data.entity.board;

import com.fivenonjangi.noning.data.dto.board.BoardDataDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board_data")
public class BoardData {
    @Id
    @Column(name = "board_data_id")
    long id;
    @Column(name = "opt1_selected")
    int opt1Selected;
    @Column(name = "opt2_selected")
    int opt2Selected;
    int like;
    @Column(name = "board_id")
    long boardId;

    public BoardDataDTO toDto() {
        return BoardDataDTO.builder()
                .id(id)
                .opt1Selected(opt1Selected)
                .opt2Selected(opt2Selected)
                .like(like).boardId(boardId)
                .build();
    }
}

