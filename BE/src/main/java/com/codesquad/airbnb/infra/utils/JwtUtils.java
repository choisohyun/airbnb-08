package com.codesquad.airbnb.infra.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {

    @Value("${jwt.key}")
    public void setJwtKey(String key) {
        jwtKey = key;
    }

    public static String jwtKey;

    public static String createToken(String nickname) {
        Date expirationDate = new Date(System.currentTimeMillis() + 1000 * 60 * 5);

        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("nickname", nickname);

        return Jwts.builder()
                .setExpiration(expirationDate)
                .setHeader(headers)
                .setClaims(payloads)
                .signWith(SignatureAlgorithm.HS256, jwtKey.getBytes())
                .compact();
    }

    public static Claims decrypt(String jwtToken) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtKey.getBytes())
                    .parseClaimsJws(jwtToken);

        } catch (Exception e) {
            throw new IllegalArgumentException("잘못된 토큰입니다!");
        }

        return claims.getBody();
    }
}
