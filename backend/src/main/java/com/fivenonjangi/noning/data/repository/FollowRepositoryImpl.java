package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.entity.user.QFollow;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FollowRepositoryImpl implements FollowRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public FollowRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    QFollow follow = QFollow.follow;

    @Override
    public List<Long> getFollowingList(long userId) {
        List<Long> followingIdList = queryFactory.select(follow.toUserId)
                .from(follow)
                .where(follow.fromUserId.eq(userId))
                .fetch();

        return followingIdList;
    }

    @Override
    public List<Long> getFollowerList(long userId) {
        List<Long> followerIdList = queryFactory.select(follow.fromUserId)
                .from(follow)
                .where(follow.toUserId.eq(userId))
                .fetch();

        return followerIdList;
    }
}
