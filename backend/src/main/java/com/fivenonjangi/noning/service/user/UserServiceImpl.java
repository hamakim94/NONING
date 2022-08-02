package com.fivenonjangi.noning.service.user;

import com.fivenonjangi.noning.data.dto.user.*;
import com.fivenonjangi.noning.data.entity.etc.VerifyingToken;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;
import com.fivenonjangi.noning.data.repository.board.BoardVoteRepositoryCustom;
import com.fivenonjangi.noning.data.repository.user.UserDataRepository;
import com.fivenonjangi.noning.data.repository.user.UserRepository;
import com.fivenonjangi.noning.data.repository.etc.VerifyingTokenRepository;
import com.fivenonjangi.noning.service.etc.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserDataRepository userDataRepository;
    private final BoardVoteRepositoryCustom boardVoteRepositoryCustom;
    private final MailService mailService;
    private final VerifyingTokenRepository verifyingTokenRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserDataRepository userDataRepository, BoardVoteRepositoryCustom boardVoteRepositoryCustom, MailService mailService, VerifyingTokenRepository verifyingTokenRepository) {
        this.userRepository = userRepository;
        this.userDataRepository = userDataRepository;
        this.boardVoteRepositoryCustom = boardVoteRepositoryCustom;
        this.mailService = mailService;
        this.verifyingTokenRepository = verifyingTokenRepository;
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
        VerifyingToken emailVerifyingToken = VerifyingToken.createEmailVerifyingToken(user.getId());
        verifyingTokenRepository.save(emailVerifyingToken);
        try{
        mailService.sendVerifyMail(userData.getEmail(), emailVerifyingToken.getId());
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public UserDTO login(LoginRequestDTO loginRequestDTO, LocalDateTime curTime, PasswordEncoder passwordEncoder) {
        try {
            UserData userData = userDataRepository.findByEmail(loginRequestDTO.getEmail());
            if (userData == null
                || !passwordEncoder.matches(loginRequestDTO.getPassword(), userData.getPassword())
                || !userData.isEmailVerified()) return null;

            userData.getUser().setLastLogin(curTime);
            userRepository.save(userData.getUser());

            return UserDTO.builder()
                    .userId(userData.getUser().getId())
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
    public List<VoterResponseDTO> getVoterListByBoardId(long boardId) {
        return boardVoteRepositoryCustom.findByBoardId(boardId);
    }

    @Override
    public UserDTO getUserResponse(long userId) {
        UserData userData = userDataRepository.findByUser_Id(userId);

        UserDTO userDTO = UserDTO.builder()
                                    .userId(userData.getUser().getId())
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
        UserData userData = userDataRepository.findByUser_Id(userDTO.getUserId());
        userData.updateUserData(userDTO);
        userData.getUser().updateUser(userDTO, ageToAgeCode(userDTO.getAge()));
        userRepository.save(userData.getUser());
        userDataRepository.save(userData);
    }
    @Override
    public void editPassword(LoginRequestDTO.EditPasswordDTO editPasswordDTO, String userId, PasswordEncoder passwordEncoder) throws Exception {
        UserData userdata = userDataRepository.findByEmail(editPasswordDTO.getEmail());
        if (userdata.getUser().getId() == Long.parseLong(userId)
            &&passwordEncoder.matches(editPasswordDTO.getPassword(), userdata.getPassword())){
            userdata.updatePassword(passwordEncoder.encode(editPasswordDTO.getNewPassword()));
            userDataRepository.save(userdata);
        }
        else throw new Exception();
    }
    @Override
    public boolean checkPassword(String userId, String password, PasswordEncoder passwordEncoder){
        UserData userData = userDataRepository.findByUser_Id(Long.parseLong(userId));
        if (passwordEncoder.matches(password, userData.getPassword())) return true;
        else return false;
    }
    @Override
    public void verifyEmail(String token) throws Exception{
        VerifyingToken verifyingToken = verifyingTokenRepository.findByIdAndExpirationDateAfterAndExpired(token, LocalDateTime.now(), false);
        if (verifyingToken == null) throw new Exception();
        UserData userData = userDataRepository.findByUser_Id(verifyingToken.getUserId());
        userData.verified();
        verifyingToken.useToken();
        userDataRepository.save(userData);
        verifyingTokenRepository.save(verifyingToken);
    }
    @Override
    public void findPassword(String email, String name, PasswordEncoder passwordEncoder) throws Exception{
        UserData userData = userDataRepository.findByEmail(email);
        if (userData!=null&&userData.getName().equals(name)){
            String newPassword = getRamdomPassword(10);
            userData.updatePassword(passwordEncoder.encode(newPassword));
            userDataRepository.save(userData);
            mailService.sendPasswordMail(email, newPassword);
        }
        else throw new Exception();
    }

    @Override
    public void deleteUser(long userId) throws Exception {
        userDataRepository.deleteByUser_Id(userId);
        User user = userRepository.findById(userId).get();
        user.deleteUser(LocalDateTime.now());
        userRepository.save(user);
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

    public String getRamdomPassword(int size) {
        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                '!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;
        for (int i=0; i<size; i++) {
            idx = sr.nextInt(len);
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }
}
