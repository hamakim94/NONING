package com.fivenonjangi.noning.data.dto.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.comment.CommentLike;
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
    private CommentDTO commentDTO;
    private UserDTO userDTO;
    private boolean isLike;

    public CommentLike toEntity(){
        return CommentLike.builder()
                .id(id)
//                .commentId(commentId)
//                .userId(userId)
                .isLike(isLike)
                .build();
    }
}
