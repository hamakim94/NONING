package com.fivenonjangi.noning.data.entity.user;

import com.fivenonjangi.noning.data.dto.user.UserCommentDTO;
import com.fivenonjangi.noning.data.entity.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_comment")
public class UserComment {
    @Id
    @Column(name = "user_comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @ManyToOne
    @JoinColumn(name = "comment_id")
    Comment comment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    boolean like;

    public void setUser(User user) {
        this.user = user;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public UserCommentDTO toDTO(){
        return UserCommentDTO.builder()
                .id(id)
//                .commentId(commentId)
//                .userId(userId)
                .like(like)
                .build();
    }
}
