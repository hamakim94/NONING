package com.fivenonjangi.noning.data.dto.user;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ParticipateResponseDTO {
    private long id;
    private String nickname;
    private String img;
    private String genderCode;
    private String mbti1Code;
    private String mbti2Code;
    private String mbti3Code;
    private String mbti4Code;
    private byte age;
    private String ageRangeCode;
    private String AccessToken;
    private byte vote; // 0,1,2
}
