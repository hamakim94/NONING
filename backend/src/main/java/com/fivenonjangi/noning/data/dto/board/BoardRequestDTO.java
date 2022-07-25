package com.fivenonjangi.noning.data.dto.board;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;

import java.time.LocalDateTime;

public class BoardRequestDTO {
    private String title;
    private String opt1;
    private String opt2;
    private String categoryCode;
    private LocalDateTime reg;
    private UserResponseDTO writer;
}
