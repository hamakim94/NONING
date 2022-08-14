package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.entity.board.Board;
import com.fivenonjangi.noning.data.entity.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "comment")
@ToString
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String content;
    byte level;
    LocalDateTime reg;
    @Column(name = "is_deleted")
    boolean isDeleted;
    @Column(name = "parent_id")
    Long parentId;
    @OneToOne
    @JoinColumn(name = "writer_id")
    User writer;
    @ManyToOne
    @JoinColumn(name = "board_id")
    Board board;

    public void deleteComment(){
        this.isDeleted = true;
    }

}
