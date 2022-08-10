package com.fivenonjangi.noning.data.entity.chat;

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
    @Column(name = "board_id")
    long boardId;
    @Column
    @ColumnDefault("0")
    int opt1;
    @Column
    @ColumnDefault("0")
    int opt2;

    public void enter(byte vote) {
        switch (vote) {
            case 1 :
                this.opt1++;
                break;
            case 2 :
                opt2++;
                break;
        }
    }
    public void leave(byte vote) {
        switch (vote) {
            case 1 :
                opt1--;
                break;
            case 2 :
                opt2--;
                break;
        }
    }
    public void betray(byte vote) {
        switch (vote) {
            case 1 :
                opt1++;
                opt2--;
                break;
            case 2 :
                opt2++;
                opt1--;
                break;
        }
    }
}
