package com.fivenonjangi.noning.data.dto.user;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class FollowRequestDTO {
    private long userId;
    private long targetUserId;
}
