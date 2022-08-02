package com.fivenonjangi.noning.service;

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
    public List<Long> getFollowingId(long userId) {
        return followRepositoryCustom.getFollowingList(userId);
    }

    @Override
    public List<Long> getFollowerId(long userId) {
        return followRepositoryCustom.getFollowerList(userId);
    }
}
