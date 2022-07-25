package com.fivenonjangi.noning.data.dto.user;

import com.fivenonjangi.noning.data.dto.comment.CommentDTO;
import com.fivenonjangi.noning.data.entity.user.UserComment;
import lombok.*;


@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserCommentDTO {
    private long id;
    private CommentDTO commentDTO;
    private UserDTO userDTO;
    private boolean like;

    public UserComment toEntity(){
        return UserComment.builder()
                .id(id)
//                .commentId(commentId)
//                .userId(userId)
                .like(like)
                .build();
    }
}
