package com.fivenonjangi.noning.data.dto.comment;

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
}
