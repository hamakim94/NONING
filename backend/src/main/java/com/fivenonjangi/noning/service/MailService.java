package com.fivenonjangi.noning.service;

public interface MailService {
    void sendVerifyMail(String email, String token) throws Exception;

    void sendPasswordMail(String email, String password) throws Exception;
}
