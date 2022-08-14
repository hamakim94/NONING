package com.fivenonjangi.noning.data.repository.user;

import com.fivenonjangi.noning.data.dto.user.UserDTO;

import java.util.List;

public interface FollowRepositoryCustom {
    List<Long> getFollowingList(long userId);
    List<Long> getFollowerList(long userId);
    List<UserDTO> getFollowerDTOList(long userId);
    List<UserDTO> getFollowingDTOList(long userId);
}
