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
    private LocalDateTime reg;
}
