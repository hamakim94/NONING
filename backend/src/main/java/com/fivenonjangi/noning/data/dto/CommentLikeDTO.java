package com.fivenonjangi.noning.data.dto;

import com.fivenonjangi.noning.data.entity.CommentLike;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentLikeDTO {
    private long id;
    private int like;
    private int dislike;
    private long commentId;

    public CommentLike toEntity(){
        return CommentLike.builder()
                .id(id)
                .like(like)
                .dislike(dislike)
                .commentId(commentId)
                .build();
    }
}
