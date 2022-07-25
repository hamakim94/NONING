package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentLikeDTO;
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
@Table(name = "comment_like")
public class CommentLike {
    @Id
    @Column(name = "comment_like_id")
    long id;
    int like;
    int dislike;
    @Column(name = "comment_id")
    long commentId;

    public CommentLikeDTO toDTO(){
        return CommentLikeDTO.builder()
                .id(id)
                .like(like)
                .dislike(dislike)
                .commentId(commentId)
                .build();
    }
}
