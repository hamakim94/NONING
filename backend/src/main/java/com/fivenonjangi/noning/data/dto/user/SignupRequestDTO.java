package com.fivenonjangi.noning.data.dto.user;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SignupRequestDTO {
    private String email;
    private String password;
    private String nickname;
    private String img;
    private String genderCode;
    private String mbti1Code;
    private String mbti2Code;
    private String mbti3Code;
    private String mbti4Code;
    byte age;
    LocalDateTime reg;
}
