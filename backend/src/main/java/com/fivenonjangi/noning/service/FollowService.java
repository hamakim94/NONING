package com.fivenonjangi.noning.service;

import java.util.List;

public interface FollowService {
    public List<Long> getFollowingId(long userId);
    public List<Long> getFollowerId(long userId);
}
