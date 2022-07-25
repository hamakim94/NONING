package com.fivenonjangi.noning.data.dto.comment;

import com.fivenonjangi.noning.data.entity.comment.Comment;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentDTO {
    private long id;
    private String content;
    private byte level;
    private LocalDateTime reg;
    private boolean isDeleted;
    private long parentId;
    private long writerId;
    private long boardId;

    public Comment toEntity(){
        return Comment.builder()
                .id(id)
                .content(content)
                .reg(reg)
                .isDeleted(isDeleted)
                .parentId(parentId)
                .writerId(writerId)
                .boardId(boardId)
                .build();
    }
}
