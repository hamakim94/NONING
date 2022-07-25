package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.data.dto.user.SignupRequestDTO;
import com.fivenonjangi.noning.data.dto.user.UserDataDTO;
import com.fivenonjangi.noning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity signupUser(@RequestBody SignupRequestDTO signupRequestDTO) {

        userService.saveUser(signupRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profiles")
    public ResponseEntity<?> getUserData(long userId){
//        Map<String, Object> map = new HashMap<String, Object>();
//        UserDataDTO userDataDTO = userService.getUserDataDto(userId);
//        map.put("UserDataDTO", userDataDTO);
//        map.put("UserDTO", userDataDTO.getUser().toDto());
        return new ResponseEntity<>(userService.getUserDataDto(userId),HttpStatus.OK);
    }
}
