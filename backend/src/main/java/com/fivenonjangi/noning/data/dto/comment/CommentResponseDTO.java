package com.fivenonjangi.noning.data.dto.comment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentResponseDTO {
    private long commentId;
    private String content;
    private LocalDateTime reg;
    private long writerId;
//    private String writerNickname;
//    private String writerImg;
//    private byte writerVote; // 댓글,대댓글을 쓴 사람이 1안/2안 투표자인지
    private int likes; // 댓글, 대댓글의 좋아요 수
    private int dislikes; // 댓글, 대댓글의 싫어요 수
    private boolean userLike; // 로그인한 사용자가 좋아요를 눌렀는지
    private boolean userDislike; // 로그인한 사용자가 싫어요를 눌렀는지
}
