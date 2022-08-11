package com.fivenonjangi.noning.controller;

import com.fivenonjangi.noning.config.security.JwtTokenProvider;
import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.live.LiveResponseDTO;
import com.fivenonjangi.noning.service.live.LiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/lives")
public class LiveController {
    private final LiveService liveService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/list")
    public ResponseEntity getLiveList(HttpServletRequest request, @RequestParam("categorycode") String categoryCode){
        long userId = Long.parseLong(jwtTokenProvider.getUserPk(request.getHeader("ACCESSTOKEN")));

        List<LiveResponseDTO> liveResponseDTOList = liveService.getLiveList(userId, categoryCode);

        return new ResponseEntity<>(liveResponseDTOList, HttpStatus.OK);
    }
}
