package com.fivenonjangi.noning.data.entity.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentDataDTO;
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
@Table(name = "comment_data")
public class CommentData {
    @Id
    @Column(name = "comment_data_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    int likes;
    int dislikes;
    @OneToOne
    @JoinColumn(name = "comment_id")
    Comment comment;

    public void like(int code){
//        0: X(중립) → 좋아요
//        1: 싫어요 → 좋아요
//        2: 좋아요 → 좋아요 취소
        if(code == 0){
            this.likes++;
        } else if(code == 1) {
            this.dislikes--;
            this.likes++;
        } else if(code == 2) {
            this.likes--;
        }
    }

    public void dislike(int code){
//        0: X(중립) → 싫어요
//        1: 싫어요 → 싫어요 취소
//        2: 좋아요 → 싫어요
        if(code == 0){
            this.dislikes++;
        } else if(code == 1) {
            this.dislikes--;
        } else if(code == 2) {
            this.likes--;
            this.dislikes++;
        }
    }

    public CommentDataDTO toDTO(){
        return CommentDataDTO.builder()
                .id(id)
                .likes(likes)
                .dislikes(dislikes)
                .comment(comment.toDto())
                .build();
    }
}
