package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.user.LoginRequestDTO;
import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.service.FollowService;
import com.fivenonjangi.noning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final FollowService  followService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService, FollowService followService, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.followService = followService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity signupUser(@RequestBody SignupRequestDTO signupRequestDTO) {
        signupRequestDTO.setPassword(passwordEncoder.encode(signupRequestDTO.getPassword()));
        try {
            userService.signupUser(signupRequestDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/profiles")
    public ResponseEntity<?> getProfiles(long userId){
        return new ResponseEntity<>(userService.getUserResponse(userId),HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){
        UserDTO userDTO = userService.login(loginRequestDTO, LocalDateTime.now(), passwordEncoder);
        if (userDTO != null) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDTO.getId(), loginRequestDTO.getPassword());
            String accessToken = jwtTokenProvider.createAccessToken(userDTO.getId());
            String refreshToken = jwtTokenProvider.createRefreshToken(userDTO.getId());
            return ResponseEntity.ok().header("ACCESSTOKEN", accessToken).header("REFRESHTOKEN", refreshToken).body(userDTO);
        }
        return new ResponseEntity<>("invalid ID",HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        String accesstoken = jwtTokenProvider.resolveToken(request, "ACCESSTOKEN");
        jwtTokenProvider.logout(accesstoken, jwtTokenProvider.getUserPk(accesstoken));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/mypage")
    public ResponseEntity getMyInfo(HttpServletRequest request){
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));
//        user (user_id, gender_code, mbti1_code, mbti2_code, mbti3_code, mbti4_code, age, age_range_code, nickname, img),
//        follow_cnt,
//        follower_cnt,
//        user_like_board_list (board_id, title, opt1, opt2, category_code, is_live, vote),
//        user_vote_board_list (board_id, title, opt1, opt2, category_code, is_live, vote),
//        user_write_board_list (board_id, title, opt1, opt2, category_code, is_live, (vote))
        UserDTO userDTO = userService.getUserResponse(userId);
        long follower_cnt = followService.getFollowerCnt(userId);
        long followee_cnt = followService.getFolloweeCnt(userId);


        return null;
    }
    @PostMapping("/profiles/edit")
    public ResponseEntity<?> modifyUser(@RequestBody UserDTO userDTO, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(userDTO.getId()))) {
            try {
                userService.modifyUser(userDTO);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/passwords/edit")
    public ResponseEntity<?> editPassword(@RequestBody LoginRequestDTO.EditPasswordDTO editPasswordDTO, HttpServletRequest request){
        try {
            userService.editPassword(editPasswordDTO
                                    , jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN"))
                                    , passwordEncoder);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
