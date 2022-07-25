package com.fivenonjangi.noning.data.entity.user;

import com.fivenonjangi.noning.data.dto.user.UserCommentDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_comment")
public class UserComment {
    @Id
    @Column(name = "user_comment_id")
    long id;
    @Column(name = "comment_id")
    long commentId;
    @Column(name = "user_id")
    long userId;
    boolean like;

    public UserCommentDTO toDTO(){
        return UserCommentDTO.builder()
                .id(id)
                .commentId(commentId)
                .userId(userId)
                .like(like)
                .build();
    }
}
