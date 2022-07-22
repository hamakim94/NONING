package com.fivenonjangi.noning.data.dto;

import com.fivenonjangi.noning.data.entity.UserData;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDataDTO {
    private long id;
    private String email;
    private boolean isEmailVerified;
    private String password;
    private String nickname;
    private String img;
    private long userId;

    public UserData toEntity(){
        return UserData.builder()
                .id(id)
                .email(email)
                .isEmailVerified(isEmailVerified)
                .password(password)
                .nickname(nickname)
                .img(img)
                .userId(userId)
                .build();
    }
}
