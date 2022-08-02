package com.fivenonjangi.noning.data.dto.board;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardRequestDTO {
    private String title;
    private String opt1;
    private String opt2;
    private String categoryCode;
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BoardVoteDTO {
        private long userId;
        private byte vote;
    }
}
