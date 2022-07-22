package com.fivenonjangi.noning.data.dto;

import com.fivenonjangi.noning.data.entity.Report;
import lombok.*;

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

    public Report toEntity() {
        return Report.builder()
                .id(id)
                .boardId(boardId)
                .commentId(commentId)
                .writerId(writerId)
                .reportCode(reportCode)
                .isCompleted(isCompleted)
                .build();
    }
}
