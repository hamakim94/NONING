package com.fivenonjangi.noning.data.repository.etc;

import com.fivenonjangi.noning.data.entity.etc.VerifyingToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface VerifyingTokenRepository extends JpaRepository<VerifyingToken, String> {
    VerifyingToken findByIdAndExpirationDateAfterAndExpired(String id, LocalDateTime now, boolean expired);
}
