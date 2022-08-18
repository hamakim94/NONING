package com.fivenonjangi.noning.data.dto.live;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LiveResponseDTO {
    ////////////board
    private long boardId;
    private String title;
    private String opt1;
    private String opt2;
    private String categoryCode;
    private LocalDateTime reg;
    //    private boolean isDeleted;
    private boolean isLive;
    private long liveId;
    private long writerId;
    /////////////user_data
    private String writerNickname;
    private String writerImg;
    /////////////board_data
    private long boardDataId;
    private int opt1Selected; // 1안 투표수
    private int opt2Selected; // 2안 투표수
    private int likes; // 해당 게시물 찜 수
    /////////////board_like
    private boolean userLike; // user의 찜여부
    /////////////board_vote
    private byte userVote; // user의 투표(0: 투표안함, 1: 1안투표, 2: 2안투표)
    /////////////live
    private int liveOpt1Selected; // live 참여자중 1안 투표수
    private int liveOpt2Selected; // live 참여자중 2안 투표수
}
