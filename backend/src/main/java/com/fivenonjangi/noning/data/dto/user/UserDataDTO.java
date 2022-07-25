package com.fivenonjangi.noning.data.dto.user;

import com.fivenonjangi.noning.data.entity.user.UserData;
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
    private UserDTO user;


    public UserData toEntity(){
        return UserData.builder()
                .id(id)
                .email(email)
                .isEmailVerified(isEmailVerified)
                .password(password)
                .nickname(nickname)
                .img(img)
                .user(user.toEntity())
                .build();
    }
}
