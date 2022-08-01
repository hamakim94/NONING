package com.fivenonjangi.noning.data.entity.user;

import com.fivenonjangi.noning.data.dto.user.FollowDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    long fromUserId; // follower
    long toUserId; // followee

    public FollowDTO toDto() {
        return FollowDTO.builder()
                .id(id)
                .fromUserId(fromUserId)
                .toUserId(toUserId)
                .build();
    }
}
