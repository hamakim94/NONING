package com.fivenonjangi.noning.data.entity.chat;

import com.fivenonjangi.noning.data.entity.board.Board;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "chat_room")
@ToString
public class ChatRoom {
    @Id
    @Column(name = "chat_room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @OneToOne
    @JoinColumn(name = "board_id")
    Board board;
    @Column(name = "opt1_selected")
    @ColumnDefault("0")
    int opt1Selected;
    @Column(name = "opt2_selected")
    @ColumnDefault("0")
    int opt2Selected;

    public void enter(byte vote) {
        switch (vote) {
            case 1 :
                this.opt1Selected++;
                break;
            case 2 :
                opt2Selected++;
                break;
        }
    }
    public void leave(byte vote) {
        switch (vote) {
            case 1 :
                opt1Selected--;
                break;
            case 2 :
                opt2Selected--;
                break;
        }
    }
    public void betray(byte vote) {
        switch (vote) {
            case 1 :
                opt1Selected++;
                opt2Selected--;
                break;
            case 2 :
                opt2Selected++;
                opt1Selected--;
                break;
        }
    }
}
