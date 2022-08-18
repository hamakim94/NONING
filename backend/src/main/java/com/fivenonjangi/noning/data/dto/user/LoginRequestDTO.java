package com.fivenonjangi.noning.data.dto.user;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LoginRequestDTO {
    private String email;
    private String password;


    @Getter
    @Setter
    public static class EditPasswordDTO{
        private long userId;
        private String password;
        private String newPassword;
    }
}
