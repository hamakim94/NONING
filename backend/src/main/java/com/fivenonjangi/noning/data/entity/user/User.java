package com.fivenonjangi.noning.data.entity.user;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(name = "gender_code")
    String genderCode;
    @Column(name = "mbti1_code")
    String mbti1Code;
    @Column(name = "mbti2_code")
    String mbti2Code;
    @Column(name = "mbti3_code")
    String mbti3Code;
    @Column(name = "mbti4_code")
    String mbti4Code;
    byte age;
    @Column(name = "age_range_code")
    String ageRangeCode;
    LocalDateTime reg;
    @Column(name = "last_login")
    LocalDateTime lastLogin;
    @Column(name = "delete_date")
    LocalDateTime deleteDate;
    @Column(name = "is_deleted")
    boolean isDeleted;

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public void updateUser(UserDTO userDTO, String ageRangeCode) {
        this.genderCode = userDTO.getGenderCode();
        this.mbti1Code = userDTO.getMbti1Code();
        this.mbti2Code = userDTO.getMbti2Code();
        this.mbti3Code = userDTO.getMbti3Code();
        this.mbti4Code = userDTO.getMbti4Code();
        this.age = userDTO.getAge();
        this.ageRangeCode = ageRangeCode;
    }
}
