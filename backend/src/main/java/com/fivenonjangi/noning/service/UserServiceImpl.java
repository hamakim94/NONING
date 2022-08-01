package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.*;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;
import com.fivenonjangi.noning.data.repository.BoardVoteRepositoryCustom;
import com.fivenonjangi.noning.data.repository.UserDataRepository;
import com.fivenonjangi.noning.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserDataRepository userDataRepository;
    private final BoardVoteRepositoryCustom boardVoteRepositoryCustom;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserDataRepository userDataRepository, BoardVoteRepositoryCustom boardVoteRepositoryCustom) {
        this.userRepository = userRepository;
        this.userDataRepository = userDataRepository;
        this.boardVoteRepositoryCustom = boardVoteRepositoryCustom;
    }

    @Override
    public void signupUser(SignupRequestDTO signupRequestDTO) throws Exception{
        if (userDataRepository.findByEmailOrNickname(signupRequestDTO.getEmail(), signupRequestDTO.getNickname()) != null) throw new Exception();
        User user = User.builder()
                .genderCode(signupRequestDTO.getGenderCode())
                .mbti1Code(signupRequestDTO.getMbti1Code())
                .mbti2Code(signupRequestDTO.getMbti2Code())
                .mbti3Code(signupRequestDTO.getMbti3Code())
                .mbti4Code(signupRequestDTO.getMbti4Code())
                .age(signupRequestDTO.getAge())
                .ageRangeCode(ageToAgeCode(signupRequestDTO.getAge()))
                .reg(LocalDateTime.now())
                .build();
        UserData userData = UserData.builder()
                .name(signupRequestDTO.getName())
                .email(signupRequestDTO.getEmail())
                .password(signupRequestDTO.getPassword())
                .nickname(signupRequestDTO.getNickname())
                .img(signupRequestDTO.getImg())
                .build();
        userData.setUser(userRepository.save(user));
        userDataRepository.save(userData);
    }



    @Override
    public UserDTO login(LoginRequestDTO loginRequestDTO, LocalDateTime curTime, PasswordEncoder passwordEncoder) {
        try {
            UserData userData = userDataRepository.findByEmail(loginRequestDTO.getEmail());
            if (userData == null
                ||passwordEncoder.matches(loginRequestDTO.getPassword(), userData.getPassword())
                || !userData.isEmailVerified()) return null;

            userData.getUser().setLastLogin(curTime);
            userRepository.save(userData.getUser());

            return UserDTO.builder()
                    .id(userData.getUser().getId())
                    .nickname(userData.getNickname())
                    .img(userData.getImg())
                    .genderCode(userData.getUser().getGenderCode())
                    .mbti1Code(userData.getUser().getMbti1Code())
                    .mbti2Code(userData.getUser().getMbti2Code())
                    .mbti3Code(userData.getUser().getMbti3Code())
                    .mbti4Code(userData.getUser().getMbti4Code())
                    .age(userData.getUser().getAge())
                    .ageRangeCode(userData.getUser().getAgeRangeCode())
                    .build();

        }
        catch (Exception e){
            e.getStackTrace();
            return null;
        }
    }

    @Override
    public UserData getUserByEmail(String email) {
        return userDataRepository.findByEmail(email);
    }

    @Override
    public UserData getUserById(long id) {
        return userDataRepository.findByUser_Id(id);
    }

    @Override
    public List<ParticipateResponseDTO> getUserListByBoardId(long boardId) {
        return boardVoteRepositoryCustom.findByBoardId(boardId);
    }

    @Override
    public UserDTO getUserResponse(long userId) {
        UserData userData = userDataRepository.findByUser_Id(userId);

        UserDTO userDTO = UserDTO.builder()
                                    .id(userData.getUser().getId())
                                    .img(userData.getImg())
                                    .nickname(userData.getNickname())
                                    .genderCode(userData.getUser().getGenderCode())
                                    .mbti1Code(userData.getUser().getMbti1Code())
                                    .mbti2Code(userData.getUser().getMbti2Code())
                                    .mbti3Code(userData.getUser().getMbti3Code())
                                    .mbti4Code(userData.getUser().getMbti4Code())
                                    .age(userData.getUser().getAge())
                                    .ageRangeCode(userData.getUser().getAgeRangeCode())
                                    .build();

        return userDTO;
    }

    @Override
    public void modifyUser(UserDTO userDTO) throws Exception{
        UserData userData = userDataRepository.findByUser_Id(userDTO.getId());
        userData.updateUserData(userDTO);
        userData.getUser().updateUser(userDTO, ageToAgeCode(userDTO.getAge()));
        userRepository.save(userData.getUser());
        userDataRepository.save(userData);
    }

    private String ageToAgeCode(byte age) {
        switch (age/10) {
            case 0: return "A0101";
            case 1: return "A0102";
            case 2: return "A0103";
            case 3: return "A0104";
            case 4: return "A0105";
            case 5: return "A0106";
            default: return "A0107";
        }
    }
}
