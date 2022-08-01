package com.fivenonjangi.noning.data.entity.etc;

import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class VerifyingToken {

    private static final long EXPIRATION_TIME_VALUE = 60l;

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(length = 36)
    private String id;

    private LocalDateTime expirationDate;
    private boolean expired;
    private long userId;
    @CreatedDate
    private LocalDateTime createDate;
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    public static VerifyingToken createEmailVerifyingToken(long userId){
        VerifyingToken verifyingToken = new VerifyingToken();
        verifyingToken.expirationDate = LocalDateTime.now().plusMinutes(EXPIRATION_TIME_VALUE);
        verifyingToken.userId = userId;
        verifyingToken.expired = false;
        return verifyingToken;
    }

    public void useToken() {
        this.expired = true;
    }
}
