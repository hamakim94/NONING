package com.fivenonjangi.noning.data.repository;

public interface FollowRepositoryCustom {
    long getFolloweeCnt(long userId);
    long getFollowerCnt(long userId);
}
