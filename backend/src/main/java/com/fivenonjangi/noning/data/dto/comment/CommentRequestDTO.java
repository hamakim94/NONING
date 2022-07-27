package com.fivenonjangi.noning.data.dto.comment;

import com.fivenonjangi.noning.data.dto.board.BoardDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentRequestDTO {
    private String content;
    private byte level;
    private long parentId;
    private long writerId;
}
