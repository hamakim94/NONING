package com.fivenonjangi.noning.data.entity.board;

import com.fivenonjangi.noning.data.dto.board.BoardDataDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board_data")
public class BoardData {
    @Id
    @Column(name = "board_data_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(name = "opt1_selected")
    int opt1Selected;
    @Column(name = "opt2_selected")
    int opt2Selected;
    int like;
    @OneToOne
    @JoinColumn(name = "board_id")
    Board board;

    public BoardDataDTO toDto() {
        return BoardDataDTO.builder()
                .id(id)
                .opt1Selected(opt1Selected)
                .opt2Selected(opt2Selected)
                .like(like)
                .board(board.toDto())
                .build();
    }
}

