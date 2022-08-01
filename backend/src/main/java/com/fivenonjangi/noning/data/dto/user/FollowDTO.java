package com.fivenonjangi.noning.data.dto.user;

import com.fivenonjangi.noning.data.entity.user.Follow;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FollowDTO {
    private long id;
    private long fromUserId;
    private long toUserId;

    public Follow toEntity(){
        return Follow.builder()
            .id(id)
            .fromUserId(fromUserId)
            .toUserId(toUserId)
            .build();
    }
}
