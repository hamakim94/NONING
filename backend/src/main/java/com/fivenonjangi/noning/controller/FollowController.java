package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.user.FollowRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.service.user.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/follows")
public class FollowController {
    private final FollowService followService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/add")
    public ResponseEntity addFollowing(@RequestBody FollowRequestDTO followRequestDto, HttpServletRequest request){
        try{
            checkUser(followRequestDto.getUserId(), request);
            followService.addFollowing(followRequestDto.getUserId(), followRequestDto.getTargetUserId());
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/delete")
    public ResponseEntity deleteFollowing(@RequestBody FollowRequestDTO followRequestDto, HttpServletRequest request){
        try{
            checkUser(followRequestDto.getUserId(), request);
            followService.deleteFollowing(followRequestDto.getUserId(), followRequestDto.getTargetUserId());
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/list/{userId}")
    public ResponseEntity getFollowList(@PathVariable long userId){
        try{
            List<UserDTO> followerList = followService.getFollowerList(userId);
            List<UserDTO> followingList = followService.getFollowingList(userId);
            Map<String, List<UserDTO>> result = new HashMap<>();
            result.put("followers", followerList);
            result.put("followings", followingList);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){

        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/followers/delete")
    public ResponseEntity deleteFollower(@RequestBody FollowRequestDTO followRequestDto, HttpServletRequest request){
        try{
            checkUser(followRequestDto.getUserId(), request);
            followService.deleteFollower(followRequestDto.getUserId(), followRequestDto.getTargetUserId());
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private void checkUser(long userId, HttpServletRequest request) throws Exception{
        if (!jwtTokenProvider.getUserPk(jwtTokenProvider.resolveToken(request, "ACCESSTOKEN")).equals(String.valueOf(userId)))
            throw new Exception();
    }

}
