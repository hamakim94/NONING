package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentDTO;
import com.fivenonjangi.noning.data.entity.board.Board;
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
@Table(name = "comment")
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
    long parentId;
    @OneToOne
    @JoinColumn(name = "writer_id")
    User writer;
    @ManyToOne
    @JoinColumn(name = "board_id")
    Board board;

    public CommentDTO toDto(){
        return CommentDTO.builder()
                .id(id)
                .content(content)
                .level(level)
                .reg(reg)
                .isDeleted(isDeleted)
                .parentId(parentId)
                .writer(writer.toDto())
                .board(board.toDto())
                .build();
    }
}
