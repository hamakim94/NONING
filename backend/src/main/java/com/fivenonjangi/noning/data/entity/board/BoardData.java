package com.fivenonjangi.noning.data.entity.board;

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
    int likes;
    @OneToOne
    @JoinColumn(name = "board_id")
    Board board;

    public void updateVote(byte vote, boolean isBetray) {
        if (vote == 1){
            opt1Selected++;
            if (isBetray) opt2Selected--;
        } else if (vote == 2){
            opt2Selected++;
            if (isBetray) opt1Selected--;
        }
    }
    public void like() {
        likes++;
    }
    public void unlike() {
        likes--;
    }
}

