package com.fivenonjangi.noning.data.entity;

import com.fivenonjangi.noning.data.dto.FollowDTO;
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
@Table(name = "follow")
public class Follow {
    @Id
    @Column(name = "follow_id")
    long id;
    @Column(name = "from_user_id")
    long fromUserId;
    @Column(name = "to_user_id")
    long toUserId;

    public FollowDTO toDto() {
        return FollowDTO.builder()
                .id(id)
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .build();
    }
}
