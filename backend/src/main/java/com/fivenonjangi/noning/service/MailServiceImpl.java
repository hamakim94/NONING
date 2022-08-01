package com.fivenonjangi.noning.service;

import com.fivenonjangi.noning.data.entity.etc.VerifyingToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@RequiredArgsConstructor
@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;

    @Override
    public void sendVerifyMail(String email, String token) throws Exception{
//        MimeMessage message = javaMailSender.createMimeMessage();
//        System.out.println(1);
//        message.addRecipients(MimeMessage.RecipientType.TO, email);//보내는 대상
//        System.out.println(2);
//        message.setSubject("Babble회원가입 이메일 인증");//제목
//        System.out.println(3);
//
        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 noning입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>회원가입을 위해 아래 링크를 눌러주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 링크.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "Link : <strong><a href='localhost:9999/api/users/verify?token=";
        msgg+= token+"'>인증하기</a></strong><div><br/> ";
        msgg+= "</div>";
//        System.out.println(4);
//        message.setText(msgg, "utf-8", "html");//내용
//        System.out.println(5);
//        message.setFrom(new InternetAddress("noning2025@gmail.com","noning"));//보내는 사람
//        System.out.println(6);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        System.out.println(email);
        simpleMailMessage.setTo(email);
        simpleMailMessage.setSubject("noning회원가입 이메일 인증");
        simpleMailMessage.setText(msgg);
        simpleMailMessage.setFrom("noning2025@gmail.com");
        javaMailSender.send(simpleMailMessage);
        System.out.println(7);
    }
}
