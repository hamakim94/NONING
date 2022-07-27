package com.fivenonjangi.noning.data.dto.comment;

import com.fivenonjangi.noning.data.entity.comment.CommentData;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentDataDTO {
    private long id;
    private int likes;
    private int dislikes;
    private CommentDTO comment;

    public CommentData toEntity(){
        return CommentData.builder()
                .id(id)
                .likes(likes)
                .dislikes(dislikes)
                .comment(comment.toEntity())
                .build();
    }
}
