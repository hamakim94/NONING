package com.fivenonjangi.noning.data.dto.etc;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.etc.Inquire;
import lombok.*;

import java.time.LocalDateTime;

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
    private UserDTO writer;
    private String file;
    private boolean isDeleted;
    private LocalDateTime reg;

    public Inquire toEntity() {
        return Inquire.builder()
                .id(id)
                .title(title)
                .content(content)
                .writer(writer.toEntity())
                .file(file)
                .isDeleted(isDeleted)
                .reg(reg)
                .build();
    }
}
