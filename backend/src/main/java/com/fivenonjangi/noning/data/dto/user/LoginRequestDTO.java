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
    public static class EditPasswordDTO extends LoginRequestDTO{
        private String newPassword;
    }
}
