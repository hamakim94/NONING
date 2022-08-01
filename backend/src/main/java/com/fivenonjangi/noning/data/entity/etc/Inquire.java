package com.fivenonjangi.noning.data.entity.etc;

import com.fivenonjangi.noning.data.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @ManyToOne
    @JoinColumn(name = "writer_id")
    User writer;
    String file;
    @Column(name = "is_deleted")
    boolean isDeleted;

    LocalDateTime reg;

    public void setWriter(User writer) {
        this.writer = writer;
    }

}
