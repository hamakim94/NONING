package com.fivenonjangi.noning.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class JwtTokenFilter extends OncePerRequestFilter  {

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // Request로 들어오는 Jwt Token의 유효성을 검증(jwtTokenProvider.validateToken)하는 filter를 filterChain에 등록합니다.
    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String accessToken = jwtTokenProvider.resolveToken(request, "ACCESSTOKEN");
        if (accessToken != null&&jwtTokenProvider.validateToken(accessToken)) {
                try {
                    Authentication auth = jwtTokenProvider.getAuthentication(accessToken);
                    SecurityContextHolder.getContext().setAuthentication(auth);
                } catch (Exception e) {
                    System.out.println("error");
//                CommonResult result = new CommonResult();
//                result.setOutput(-1000);
//                result.setMsg("This member not exist");
//                res.setContentType("application/json");
//                ObjectMapper mapper = new ObjectMapper();
//                PrintWriter out = res.getWriter();
//                out.print(mapper.writeValueAsString(result));
//                out.flush();
                    return;
                }
        }
        filterChain.doFilter(request, response);

    }
}
