package com.fivenonjangi.noning.data.entity;

import com.fivenonjangi.noning.data.dto.UserDataDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_data")
public class UserData {
    @Id
    @Column(name = "user_data_id")
    long id;

    String email;
    @Column(name = "is_email_verified")
    boolean isEmailVerified;
    String password;
    String nickname;
    String img;
    @Column(name = "user_id")
    long userId;

    public UserDataDTO toDTO(){
        return UserDataDTO.builder()
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
