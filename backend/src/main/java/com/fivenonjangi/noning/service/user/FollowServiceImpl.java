package com.fivenonjangi.noning.service.user;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.user.Follow;
import com.fivenonjangi.noning.data.repository.user.FollowRepository;
import com.fivenonjangi.noning.data.repository.user.FollowRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService{
    private final FollowRepositoryCustom followRepositoryCustom;
    private final FollowRepository followRepository;


    @Override
    public List<Long> getFollowingId(long userId) {
        return followRepositoryCustom.getFollowingList(userId);
    }

    @Override
    public List<Long> getFollowerId(long userId) {
        return followRepositoryCustom.getFollowerList(userId);
    }

    @Override
    public void addFollowing(long userId, long targetUserId) {
        if (followRepository.findByFromUserIdEqualsAndToUserIdEquals(userId, targetUserId) == null) {
            Follow follow = Follow.builder()
                    .fromUserId(userId)
                    .toUserId(targetUserId)
                    .build();
            followRepository.save(follow);
        }
    }
    @Override
    public void deleteFollowing(long userId, long targetUserId) {
        followRepository.deleteFollowByFromUserIdEqualsAndToUserIdEquals(userId, targetUserId);
    }
    @Override
    public void deleteFollower(long userId, long targetUserId) {
        followRepository.deleteFollowByFromUserIdEqualsAndToUserIdEquals(targetUserId, userId);
    }
    @Override
    public List<UserDTO> getFollowerList(long userId) {
        List<UserDTO> followerList = followRepositoryCustom.getFollowerDTOList(userId);
        return followerList;
    }
    @Override
    public List<UserDTO> getFollowingList(long userId) {
        List<UserDTO> followingList = followRepositoryCustom.getFollowingDTOList(userId);
        return followingList;
    }
}
