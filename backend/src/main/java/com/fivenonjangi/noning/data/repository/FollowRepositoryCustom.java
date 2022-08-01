package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;

import java.util.List;

public interface FollowRepositoryCustom {
    long getFolloweeCnt(long userId);
    long getFollowerCnt(long userId);
}
