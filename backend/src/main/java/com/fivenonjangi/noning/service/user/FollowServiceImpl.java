package com.fivenonjangi.noning.service.user;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.user.Follow;
import com.fivenonjangi.noning.data.repository.user.FollowRepository;
import com.fivenonjangi.noning.data.repository.user.FollowRepositoryCustom;
import com.fivenonjangi.noning.data.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FollowServiceImpl implements FollowService{
    private final FollowRepositoryCustom followRepositoryCustom;
    private final FollowRepository followRepository;
    private final UserRepository userRepository;


    @Override
    public List<Long> getFollowingId(long userId) {
        return followRepositoryCustom.getFollowingList(userId);
    }

    @Override
    public List<Long> getFollowerId(long userId) {
        return followRepositoryCustom.getFollowerList(userId);
    }

    @Override
    public void addFollowing(long userId, long targetUserId) throws Exception{
        if (userId!=targetUserId && followRepository.findByFromUserIdEqualsAndToUserIdEquals(userId, targetUserId) == null && !userRepository.findById(targetUserId).get().isDeleted()) {
            Follow follow = Follow.builder()
                    .fromUserId(userId)
                    .toUserId(targetUserId)
                    .build();
            followRepository.save(follow);
        }else throw new Exception();
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
