package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.user.LoginRequestDTO;
import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.service.board.BoardService;
import com.fivenonjangi.noning.service.etc.AwsS3Service;
import com.fivenonjangi.noning.service.user.FollowService;
import com.fivenonjangi.noning.service.user.UserService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final FollowService  followService;
    private final BoardService boardService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AwsS3Service awsS3Service;

    @PostMapping("/signup")
    public ResponseEntity signupUser(@RequestPart(value = "signupRequestDTO") String signupRequestDTOString, @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            String DTO = new String(signupRequestDTOString.getBytes("8859_1"), StandardCharsets.UTF_8);
            Gson gson = new Gson();
            SignupRequestDTO signupRequestDTO = gson.fromJson(DTO, SignupRequestDTO.class);
            String img = "";
            if (image != null&&image.getContentType().startsWith("image")){
                    img = awsS3Service.uploadFileV1("profileImg", image);
            }
            signupRequestDTO.setImg(img);
            userService.signupUser(signupRequestDTO, passwordEncoder);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/profiles")
    public ResponseEntity getProfiles(long userId){
        try{
            UserDTO userDTO = userService.getUserById(userId);
            return new ResponseEntity<>(userDTO,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO loginRequestDTO){
        UserDTO userDTO = userService.login(loginRequestDTO, LocalDateTime.now(), passwordEncoder);
        if (userDTO != null) {
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDTO.getUserId(), loginRequestDTO.getPassword());
            String accessToken = jwtTokenProvider.createAccessToken(userDTO.getUserId());
            String refreshToken = jwtTokenProvider.createRefreshToken(userDTO.getUserId());
            return ResponseEntity.ok().header("ACCESSTOKEN", accessToken).header("REFRESHTOKEN", refreshToken).body(userDTO);
        }
        return new ResponseEntity<>("invalid ID",HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request){
        String accesstoken = jwtTokenProvider.resolveToken(request, "ACCESSTOKEN");
        jwtTokenProvider.logout(accesstoken, jwtTokenProvider.getUserPk(accesstoken));
        return ResponseEntity.ok().build();
    }
    @GetMapping("/{userid}/page")
    public ResponseEntity getMyPageInfo(@PathVariable("userid") long userId){
        try{
            UserDTO user = userService.getUserById(userId);
            List<Long> followingIdList = followService.getFollowingId(userId);
            List<Long> followerIdList = followService.getFollowerId(userId);
            List<BoardResponseDTO> boardList = boardService.getBoardListByUserId(userId);

            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("user", user);
            resultMap.put("followingIdList", followingIdList);
            resultMap.put("followerIdList", followerIdList);
            resultMap.put("boardList", boardList);

            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/profiles/edit")
    public ResponseEntity modifyUser(@RequestPart(value = "userDTO") String userDTOString, @RequestPart(value = "image", required = false) MultipartFile image, HttpServletRequest request){
        try {
            String DTO = new String(userDTOString.getBytes("8859_1"), StandardCharsets.UTF_8);
            Gson gson = new Gson();
            UserDTO userDTO = gson.fromJson(DTO, UserDTO.class);
            if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(userDTO.getUserId()))) {
                try {
                    if (image != null&&image.getContentType().startsWith("image")){
                        userDTO.setImg(awsS3Service.uploadFileV1("profileImg", image));
                    }
                    userDTO = userService.modifyUser(userDTO);
                    return new ResponseEntity<>(userDTO, HttpStatus.OK);
                } catch (Exception e) {
                    e.getStackTrace();
                }
            }
        }catch (Exception e){

        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/passwords/edit")
    public ResponseEntity editPassword(@RequestBody LoginRequestDTO.EditPasswordDTO editPasswordDTO, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(editPasswordDTO.getUserId()))) {
            try {
                userService.editPassword(editPasswordDTO
                        , passwordEncoder);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e) {
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/passwords/check")
    public ResponseEntity checkPassword(@RequestParam String password, HttpServletRequest request){
        String userId = jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN"));
        if (userService.checkPassword(userId, password, passwordEncoder))
            return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/duplications/check")
    public ResponseEntity checkDuplication(@RequestParam(name = "email", required = false) String email,@RequestParam(name = "nickname", required = false) String nickname, HttpServletRequest request){
        if (email == null) email = "";
        if (nickname == null) nickname = "";
        if (userService.checkEmailOrNickname(email, nickname))
            return new ResponseEntity<>(HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/verify")
    public void verifyingEmail(@Validated @RequestParam String token, HttpServletResponse response) {
        try {
            userService.verifyEmail(token);
            response.sendRedirect("https://i7a202.p.ssafy.io/signup/success.html");
        }
        catch (Exception e){
            try {
            response.sendRedirect("https://i7a202.p.ssafy.io/signup/error.html");
            }catch (Exception exception){}
        }
    }
    @GetMapping("/passwords/find")
    public ResponseEntity findPassword(String email, String name){
        try {
            userService.findPassword(email, name, passwordEncoder);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/delete")
    public ResponseEntity deleteUser(@RequestParam long userId, HttpServletRequest request){
        if (jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(userId))){
            try {
                userService.deleteUser(userId);
                return new ResponseEntity<>(HttpStatus.OK);
            }
            catch (Exception e){}
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/list")
    public ResponseEntity getUserList(){
        List<UserDTO> userDTOList = userService.getUserList();

        return new ResponseEntity<>(userDTOList, HttpStatus.OK);
    }
    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtTokenProvider.resolveToken(request, "REFRESHTOKEN");
        String accessToken = jwtTokenProvider.resolveToken(request, "ACCESSTOKEN");
        String userId = jwtTokenProvider.getUserPk(accessToken);
        if (refreshToken.equals(jwtTokenProvider.getRefreshToken(userId))&&jwtTokenProvider.validateToken(refreshToken)) {
            accessToken = jwtTokenProvider.createAccessToken(Long.parseLong(jwtTokenProvider.getUserPk(refreshToken)));
            response.setHeader("ACCESSTOKEN", accessToken);
            Authentication auth = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(auth);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/upload")
    public ResponseEntity uploadFile (@RequestPart("image") MultipartFile image){
        try {
            if (image != null&&image.getContentType().startsWith("image")){
                awsS3Service.uploadFileV1("profileImg", image);
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
