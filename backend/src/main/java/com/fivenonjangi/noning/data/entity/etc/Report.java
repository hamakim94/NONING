package com.fivenonjangi.noning.data.entity.etc;

import com.fivenonjangi.noning.data.dto.etc.ReportDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "report")
public class Report {
    @Id
    @Column(name = "report_id")
    long id;
    @Column(name = "board_id")
    long boardId;
    @Column(name = "comment_id")
    long commentId;
    @Column(name = "writer_id")
    long writerId;
    @Column(name = "report_code")
    String reportCode;
    @Column(name = "is_completed")
    boolean isCompleted;

    LocalDateTime reg;

    public ReportDTO toDto(){
        return ReportDTO.builder()
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
