package com.fivenonjangi.noning.data.dto.etc;

import com.fivenonjangi.noning.data.entity.etc.Report;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Getter
@Setter
public class ReportDTO {
    private long id;
    private long boardId;
    private long commentId;
    private long writerId;
    private String reportCode;
    private boolean isCompleted;
    private LocalDateTime reg;

    public Report toEntity() {
        return Report.builder()
                .id(id)
                .boardId(boardId)
                .commentId(commentId)
                .writerId(writerId)
                .reportCode(reportCode)
                .isCompleted(isCompleted)
                .reg(reg)
                .build();
    }
}
