package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.user.UserResponseDTO;
import com.fivenonjangi.noning.data.entity.user.QFollow;
import com.querydsl.core.Tuple;
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
    public long getFolloweeCnt(long userId) { // 나를 팔로우하는 사람들
        long followeeCnt = queryFactory.select(follow.count())
                .from(follow)
                .where(follow.toUser.id.eq(userId))
                .fetchOne()
                .longValue();

        return followeeCnt;
    }

    @Override
    public long getFollowerCnt(long userId) { // 내가 팔로우하는 사람들
        long followerCnt = queryFactory.select(follow.count())
                .from(follow)
                .where(follow.fromUser.id.eq(userId))
                .fetchOne()
                .longValue();

        return followerCnt;
    }
}
