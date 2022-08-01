package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.entity.user.User;
import com.fivenonjangi.noning.data.repository.FollowRepository;
import com.fivenonjangi.noning.data.repository.FollowRepositoryCustom;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowServiceImpl implements FollowService{
    private final FollowRepositoryCustom followRepositoryCustom;

    public FollowServiceImpl(FollowRepositoryCustom followRepositoryCustom) {
        this.followRepositoryCustom = followRepositoryCustom;
    }

    @Override
    public long getFolloweeCnt(long userId) { // 나를 팔로우하는 사람들
        return followRepositoryCustom.getFolloweeCnt(userId);
    }

    @Override
    public long getFollowerCnt(long userId) { // 내가 팔로우하는 사람들
        return followRepositoryCustom.getFollowerCnt(userId);
    }
}
