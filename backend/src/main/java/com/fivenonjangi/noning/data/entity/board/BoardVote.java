package com.fivenonjangi.noning.data.entity.board;

import com.fivenonjangi.noning.data.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "board_vote")
public class BoardVote {
    @Id
    @Column(name = "board_vote_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    byte vote;
    @ManyToOne
    @JoinColumn(name = "board_id")
    Board board;
    @OneToOne
    @JoinColumn(name = "user_id")
    User user;
    LocalDateTime reg;

    public void updateVote(byte vote, LocalDateTime now){
        this.vote = vote;
        this.reg = now;
    }
}

