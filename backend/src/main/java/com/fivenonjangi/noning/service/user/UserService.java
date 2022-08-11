package com.fivenonjangi.noning.service.user;

import com.fivenonjangi.noning.data.dto.user.*;
import com.fivenonjangi.noning.data.entity.user.UserData;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {
    void signupUser(SignupRequestDTO signupRequestDTO, PasswordEncoder passwordEncoder) throws Exception;
    UserDTO login(LoginRequestDTO loginRequestDTO, LocalDateTime curTime, PasswordEncoder passwordEncoder);
    UserData getUserDataById(long id);
    List<VoterResponseDTO> getVoterListByBoardId(long boardId);
    UserDTO getUserById(long userId) throws Exception;
    UserDTO modifyUser(UserDTO userDTO) throws Exception;
    void editPassword(LoginRequestDTO.EditPasswordDTO editPasswordDTO, PasswordEncoder passwordEncoder) throws Exception;
    boolean checkPassword(String userId, String password, PasswordEncoder passwordEncoder);
    boolean checkEmailOrNickname(String email, String nickname);
    void verifyEmail(String token) throws Exception;
    void findPassword(String email, String name, PasswordEncoder passwordEncoder) throws Exception;
    void deleteUser(long userId) throws Exception;
    List<UserDTO> getUserList();
}
