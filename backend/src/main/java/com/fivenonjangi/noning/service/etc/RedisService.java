package com.fivenonjangi.noning.service.etc;

import java.time.Duration;

public interface RedisService {
    void deleteValues(String key);
    String getValues(String key);
    void setValues(String key, String data, Duration duration);
    void setValues(String key, String data);

    void getRedisStringValue(String key);
}
