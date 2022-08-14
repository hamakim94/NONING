package com.fivenonjangi.noning.service.etc;

public interface MailService {
    void sendVerifyMail(String email, String token) throws Exception;

    void sendPasswordMail(String email, String password) throws Exception;
}
