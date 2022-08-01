package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.user.LoginRequestDTO;
import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.service.BoardService;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.service.FollowService;
import com.fivenonjangi.noning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final FollowService  followService;
    private final BoardService boardService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(UserService userService, FollowService followService, BoardService boardService, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.followService = followService;
        this.boardService  = boardService;
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
    @GetMapping("/{userid}/page")
    public ResponseEntity getMyPageInfo(@PathVariable("userid") long userId){
        UserDTO user = userService.getUserResponse(userId);
        List<Long> followingIdList = followService.getFollowingId(userId);
        List<Long> followeeIdList = followService.getFollowerId(userId);
        List<BoardResponseDTO> boardList = boardService.getBoardListByUserId(userId);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("user", user);
        resultMap.put("following_id_list", followingIdList);
        resultMap.put("followee_id_list", followeeIdList);
        resultMap.put("board_list", boardList);

        return new ResponseEntity<>(resultMap, HttpStatus.OK);
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
    @PostMapping("/passwords/check")
    public ResponseEntity<?> checkPassword(@RequestParam String password, HttpServletRequest request){
        String userId = jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN"));
        if (userService.checkPassword(userId, password, passwordEncoder))
            return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/verify")
    public ResponseEntity verifyingEmail(@Validated @RequestParam String token) {
        try {
            userService.verifyEmail(token);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}
