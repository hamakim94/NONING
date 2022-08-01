package com.fivenonjangi.noning.data.repository;

import java.util.List;

public interface FollowRepositoryCustom {
    List<Long> getFollowingList(long userId);
    List<Long> getFollowerList(long userId);
}
