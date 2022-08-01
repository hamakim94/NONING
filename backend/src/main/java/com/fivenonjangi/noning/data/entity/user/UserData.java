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
}
