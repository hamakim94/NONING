package com.fivenonjangi.noning.data.dto.etc;

import com.fivenonjangi.noning.data.entity.etc.Inquire;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class InquireDTO {
    private long id;
    private String title;
    private String content;
    private long writerId;
    private String file;
    private boolean isDeleted;

    public Inquire toEntity() {
        return Inquire.builder()
                .id(id)
                .title(title)
                .content(content)
                .writerId(writerId)
                .file(file)
                .isDeleted(isDeleted)
                .build();
    }
}
