package com.fivenonjangi.noning.data.dto.comment;

import com.fivenonjangi.noning.data.dto.board.BoardDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
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
    private UserDTO writer;
    private BoardDTO board;

    public Comment toEntity(){
        return Comment.builder()
                .id(id)
                .content(content)
                .reg(reg)
                .isDeleted(isDeleted)
                .parentId(parentId)
                .writer(writer.toEntity())
                .board(board.toEntity())
                .build();
    }
}
