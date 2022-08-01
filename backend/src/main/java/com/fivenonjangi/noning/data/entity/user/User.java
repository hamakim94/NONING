package com.fivenonjangi.noning.data.entity.user;

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
}
