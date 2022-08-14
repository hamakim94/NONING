package com.fivenonjangi.noning.service.etc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisServiceImpl implements RedisService{
    private RedisTemplate redisTemplate;

    @Autowired
    public RedisServiceImpl(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    @Override
    public void setValues(String key, String data) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data);
    }
    @Override
    public void setValues(String key, String data, Duration duration) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data, duration);
    }
    @Override
    public String getValues(String key) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(key);
    }
    @Override
    public void deleteValues(String key) {
        redisTemplate.delete(key);
    }
    @Override
    public void getRedisStringValue(String key) {
        ValueOperations<String, String> stringValueOperations = redisTemplate.opsForValue();
        System.out.println("Redis key : " + key);
        System.out.println("Redis value : " + stringValueOperations.get(key));
    }
}
