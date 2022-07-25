package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentLikeDTO;
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
    int like;
    int dislike;
    @OneToOne
    @JoinColumn(name = "comment_id")
    Comment comment;

    public CommentLikeDTO toDTO(){
        return CommentLikeDTO.builder()
                .id(id)
                .like(like)
                .dislike(dislike)
                .comment(comment.toDto())
                .build();
    }
}
