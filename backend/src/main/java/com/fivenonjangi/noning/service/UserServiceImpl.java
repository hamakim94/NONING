package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;
import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.entity.user.UserData;
import com.fivenonjangi.noning.data.repository.UserDataRepository;
import com.fivenonjangi.noning.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserDataRepository userDataRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserDataRepository userDataRepository) {
        this.userRepository = userRepository;
        this.userDataRepository = userDataRepository;
    }


    @Override
    public void signupUser(SignupRequestDTO signupRequestDTO) {
        try {
            String salt = makeSalt();
            User user = User.builder()
                    .genderCode(signupRequestDTO.getGenderCode())
                    .mbti1Code(signupRequestDTO.getMbti1Code())
                    .mbti2Code(signupRequestDTO.getMbti2Code())
                    .mbti3Code(signupRequestDTO.getMbti3Code())
                    .mbti4Code(signupRequestDTO.getMbti4Code())
                    .age(signupRequestDTO.getAge())
                    .ageRangeCode(ageToAgeCode(signupRequestDTO.getAge()))
                    .reg(signupRequestDTO.getReg())
                    .build();
            UserData userData = UserData.builder()
                    .email(signupRequestDTO.getEmail())
                    .salt(salt)
                    .password(Hashing(signupRequestDTO.getPassword().getBytes(), salt))
                    .nickname(signupRequestDTO.getNickname())
                    .img(signupRequestDTO.getImg())
                    .build();
            userData.setUser(userRepository.save(user));
            userDataRepository.save(userData);
        }
        catch (Exception e){
            System.out.println(e.getStackTrace());
        }

    }

    @Override
    public UserDTO getUser(long userId) {
        return userRepository.findById(userId).get().toDto();
    }

    @Override
    public UserDataDTO getUserDataDto(long userId) {
        UserData  userData = userDataRepository.findByUser_Id(userId);
        return userData.toDTO();
    }

    @Override
    public UserResponseDTO login(String email, String password, LocalDateTime curTime) {
        try {
            UserData userData = userDataRepository.findByEmail(email);
            if (userData == null) return null;
            String salt = userData.getSalt();
            password = Hashing(password.getBytes(), salt);
            if (userData.getPassword().equals(password)){
                userData.getUser().setLastLogin(curTime);
            userRepository.save(userData.getUser());
            return UserResponseDTO.builder()
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
        }
        catch (Exception e){
            System.out.println(4);
            e.getStackTrace();
            return null;
        }
        return null;
    }

    private String makeSalt() {
        SecureRandom rnd = new SecureRandom();
        byte[] temp = new byte[16];
        rnd.nextBytes(temp);
        return Byte_to_String(temp);
    }

    private String Hashing(byte[] password, String Salt) throws Exception {

        MessageDigest md = MessageDigest.getInstance("SHA-256");	// SHA-256 해시함수를 사용

        // key-stretching
        for(int i = 0; i < 2580; i++) {
            String temp = Byte_to_String(password) + Salt;	// 패스워드와 Salt 를 합쳐 새로운 문자열 생성
            md.update(temp.getBytes());						// temp 의 문자열을 해싱하여 md 에 저장해둔다
            password = md.digest();							// md 객체의 다이제스트를 얻어 password 를 갱신한다
        }

        return Byte_to_String(password);
    }

    private String Byte_to_String(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte a : bytes) {
            sb.append(String.format("%02x", a));
        }
        return sb.toString();
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
