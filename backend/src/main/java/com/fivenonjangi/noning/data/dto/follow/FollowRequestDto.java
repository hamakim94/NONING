package com.fivenonjangi.noning.data.dto.follow;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FollowRequestDto {
    private long userId;
    private long targetUserId;
}
