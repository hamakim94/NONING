package com.fivenonjangi.noning.data.repository.user;

import com.fivenonjangi.noning.data.dto.user.UserDTO;
import com.fivenonjangi.noning.data.entity.user.QFollow;
import com.fivenonjangi.noning.data.entity.user.QUserData;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FollowRepositoryImpl implements FollowRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public FollowRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    QFollow follow = QFollow.follow;
    QUserData userData = QUserData.userData;

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

    @Override
    public List<UserDTO> getFollowerDTOList(long userId) {
        List<Tuple> tuples = queryFactory.select(userData.user.id, userData.nickname, userData.img, userData.user.genderCode, userData.user.mbti1Code,userData.user.mbti2Code,userData.user.mbti3Code,userData.user.mbti4Code, userData.user.age, userData.user.ageRangeCode)
                .from(follow)
                .leftJoin(userData)
                .on(follow.fromUserId.eq(userData.user.id))
                .where(follow.toUserId.eq(userId))
                .fetch();

        List<UserDTO> result = new ArrayList<UserDTO>();
        for (Tuple tuple : tuples) {
            UserDTO userDTO = UserDTO.builder()
                    .userId(tuple.get(userData.user.id))
                    .nickname(tuple.get(userData.nickname))
                    .img(tuple.get(userData.img))
                    .genderCode(tuple.get(userData.user.genderCode))
                    .mbti1Code(tuple.get(userData.user.mbti1Code))
                    .mbti2Code(tuple.get(userData.user.mbti2Code))
                    .mbti3Code(tuple.get(userData.user.mbti3Code))
                    .mbti4Code(tuple.get(userData.user.mbti4Code))
                    .age(tuple.get(userData.user.age))
                    .ageRangeCode(tuple.get(userData.user.ageRangeCode))
                    .build();
            result.add(userDTO);
        }
        return result;
    }

    @Override
    public List<UserDTO> getFollowingDTOList(long userId) {
        List<Tuple> tuples = queryFactory.select(userData.user.id, userData.nickname, userData.img, userData.user.genderCode, userData.user.mbti1Code,userData.user.mbti2Code,userData.user.mbti3Code,userData.user.mbti4Code, userData.user.age, userData.user.ageRangeCode)
                .from(follow)
                .leftJoin(userData)
                .on(follow.toUserId.eq(userData.user.id))
                .where(follow.fromUserId.eq(userId))
                .fetch();

        List<UserDTO> result = new ArrayList<UserDTO>();
        for (Tuple tuple : tuples) {
            UserDTO userDTO = UserDTO.builder()
                    .userId(tuple.get(userData.user.id))
                    .nickname(tuple.get(userData.nickname))
                    .img(tuple.get(userData.img))
                    .genderCode(tuple.get(userData.user.genderCode))
                    .mbti1Code(tuple.get(userData.user.mbti1Code))
                    .mbti2Code(tuple.get(userData.user.mbti2Code))
                    .mbti3Code(tuple.get(userData.user.mbti3Code))
                    .mbti4Code(tuple.get(userData.user.mbti4Code))
                    .age(tuple.get(userData.user.age))
                    .ageRangeCode(tuple.get(userData.user.ageRangeCode))
                    .build();
            result.add(userDTO);
        }
        return result;
    }
}
