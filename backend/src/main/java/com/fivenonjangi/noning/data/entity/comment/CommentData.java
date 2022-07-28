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

    public void like(boolean isExist){
        if(isExist){
            this.dislikes--;
            this.likes++;
        } else {
            this.likes++;
        }
    }

    public void dislike(boolean isExist){
        if(isExist){
            this.likes--;
            this.dislikes++;
        } else {
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
