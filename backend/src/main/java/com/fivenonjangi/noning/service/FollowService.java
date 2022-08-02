package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.dto.user.UserDTO;

import java.util.List;

public interface FollowService {
    public List<Long> getFollowingId(long userId);
    public List<Long> getFollowerId(long userId);

    void addFollowing(long userId, long targetUserId);
    void deleteFollowing(long userId, long targetUserId);
    void deleteFollower(long userId, long targetUserId);
    List<UserDTO> getFollowerList(long userId);
    List<UserDTO> getFollowingList(long userId);
}
