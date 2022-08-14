package com.fivenonjangi.noning.data.entity.board;

import com.fivenonjangi.noning.data.entity.user.User;
import lombok.*;

import javax.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @ManyToOne
    @JoinColumn(name = "writer_id")
    User writer;
    @Column(name = "live_id")
    long liveId;

    public void deleteBoard(){
        this.isDeleted = true;
    }
    public void openLive(long liveId){
        this.isLive = true;
        this.liveId = liveId;
    }
    public void closeLive(){
        this.isLive = false;
        this.liveId = 0;
    }

}
