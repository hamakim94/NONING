package com.fivenonjangi.noning.data.entity.user;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_data")
@ToString
public class UserData {
    @Id
    @Column(name = "user_data_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String email;
    @Column(name = "is_email_verified")
    boolean isEmailVerified;
    String password;
    String nickname;
    String img;
    String name;

    @OneToOne
    @JoinColumn(name = "user_id")
    User user;

    public void setUser(User user) {
        this.user = user;
    }
    public void updateUserData(UserDTO userDTO){
        this.nickname = userDTO.getNickname();
        this.img = userDTO.getImg();
    }
    public void updatePassword(String password){
        this.password = password;
    }
    public void verified(){
        this.isEmailVerified = true;
    }

    public UserDTO toUserDTO(){
        UserDTO userDTO = UserDTO.builder()
                .userId(this.getUser().getId())
                .img(this.getImg())
                .nickname(this.getNickname())
                .genderCode(this.getUser().getGenderCode())
                .mbti1Code(this.getUser().getMbti1Code())
                .mbti2Code(this.getUser().getMbti2Code())
                .mbti3Code(this.getUser().getMbti3Code())
                .mbti4Code(this.getUser().getMbti4Code())
                .age(this.getUser().getAge())
                .ageRangeCode(this.getUser().getAgeRangeCode())
                .build();

        return userDTO;
    }
}
