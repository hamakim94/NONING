package com.fivenonjangi.noning.data.entity;

import com.fivenonjangi.noning.data.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
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
    Timestamp reg;
    @Column(name = "last_login")
    Timestamp lastLogin;
    @Column(name = "delete_date")
    Timestamp deleteDate;
    @Column(name = "is_deleted")
    boolean isDeleted;

    public UserDTO toDto(){
        return UserDTO.builder()
                .id(id)
                .genderCode(genderCode)
                .mbti1Code(mbti1Code)
                .mbti2Code(mbti2Code)
                .mbti3Code(mbti3Code)
                .mbti4Code(mbti4Code)
                .age(age)
                .ageRangeCode(ageRangeCode)
                .reg(reg)
                .lastLogin(lastLogin)
                .deleteDate(deleteDate)
                .isDeleted(isDeleted)
                .build();
    }
}
