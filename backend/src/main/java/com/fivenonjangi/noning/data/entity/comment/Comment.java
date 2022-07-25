package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
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
    long id;
    String content;
    byte level;
    LocalDateTime reg;
    @Column(name = "is_deleted")
    boolean isDeleted;
    @Column(name = "parent_id")
    long parentId;
    @Column(name = "writer_id")
    long writerId;
    @Column(name = "board_id")
    long boardId;

    public CommentDTO toDto(){
        return CommentDTO.builder()
                .id(id)
                .content(content)
                .level(level)
                .reg(reg)
                .isDeleted(isDeleted)
                .parentId(parentId)
                .writerId(writerId)
                .boardId(boardId)
                .build();
    }
}
