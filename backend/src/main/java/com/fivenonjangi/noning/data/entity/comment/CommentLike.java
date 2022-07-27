package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentLikeDTO;
import com.fivenonjangi.noning.data.entity.user.User;
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
@Table(name = "comment_like")
public class CommentLike {
    @Id
    @Column(name = "comment_like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @ManyToOne
    @JoinColumn(name = "comment_id")
    Comment comment;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    boolean isLike;

    public void setUser(User user) {
        this.user = user;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public CommentLikeDTO toDTO(){
        return CommentLikeDTO.builder()
                .id(id)
//                .commentId(commentId)
//                .userId(userId)
                .isLike(isLike)
                .build();
    }
}
