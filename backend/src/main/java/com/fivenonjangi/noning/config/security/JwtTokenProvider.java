package com.fivenonjangi.noning.config.security;

import com.fivenonjangi.noning.service.etc.RedisService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.time.Duration;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${JWT.SECRET}")
    private String secretKey;
    private Key key;
    private final long refreshTokenValidMilisecond = 1000L * 60 * 60 * 24 * 30; // 30일만 토큰 유효
    private final long accessTokenValidMilisecond = 1000L * 60 * 10; // 10분만 토큰 유효
    private UserDetailsService userDetailsService;
    private final RedisService redisService;

    @Autowired
    public JwtTokenProvider(UserDetailsService userDetailsService, RedisService redisService) {
        this.userDetailsService = userDetailsService;
        this.redisService = redisService;
    }

    @PostConstruct
    protected void init() {
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // Jwt acess토큰 생성
    public String createAccessToken(Long userId) {

        return this.createToken(userId.toString(), accessTokenValidMilisecond);
    }

    // Jwt acess토큰 생성
    public String createRefreshToken(Long userId) {
        String refreshToken = createToken(userId.toString(), refreshTokenValidMilisecond);
        redisService.setValues(userId.toString(), refreshToken, Duration.ofMillis(refreshTokenValidMilisecond));
        return refreshToken;
    }

    public String createToken(String userId, Long tokenInvalidTime) {
        Claims claims = Jwts.claims().setSubject(userId);
        claims.put("userId", userId);

        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenInvalidTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Jwt 토큰으로 인증 정보를 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    // Jwt 토큰에서 회원 구별 정보 추출
    public String getUserPk(String token) {

        JwtParser jwtParser = Jwts.parserBuilder().setSigningKey(key).build();
        try{
            return jwtParser.parseClaimsJws(token).getBody().getSubject();
        }
        catch (ExpiredJwtException e){
            return e.getClaims().getSubject();
        }
    }
    // Request의 Header에서 token 파싱 : "ACESSTOKEN: jwt토큰"
    public String resolveToken(HttpServletRequest req, String tokenName) {
        return req.getHeader(tokenName);
    }
    // Jwt 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
            if (redisService.getValues(jwtToken) != null){
                System.out.println("만료");
                return false;
            }
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
    //Redis에서 Refresh토큰 조회
    public String getRefreshToken(String email) {
        return redisService.getValues(email);
    }
    //로그아웃
    public void logout(String accessToken, String email) {
        Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken);
        long expiredAccessTokenTime = claims.getBody().getExpiration().getTime() - new Date().getTime();
        redisService.setValues(accessToken, email, Duration.ofMillis(expiredAccessTokenTime));
        redisService.deleteValues(email); // Delete RefreshToken In Redis
    }
}
