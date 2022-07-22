package com.fivenonjangi.noning.data.entity;

import com.fivenonjangi.noning.data.dto.InquireDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "inquire")
public class Inquire {
    @Id
    @Column(name = "inquire_id")
    long id;
    String title;
    String content;
    @Column(name = "writer_id")
    long writerId;
    String file;
    @Column(name = "is_deleted")
    boolean isDeleted;

    public InquireDTO toDto(){
        return InquireDTO.builder()
                .id(id)
                .title(title)
                .content(content)
                .writerId(writerId)
                .file(file)
                .isDeleted(isDeleted)
                .build();
    }

}
