package com.fivenonjangi.noning.service.etc;

import lombok.RequiredArgsConstructor;
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
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);//보내는 대상
        message.setSubject("noning회원가입 이메일 인증");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 noning입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>회원가입을 위해 아래 링크를 눌러주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:black;'>회원가입 인증 링크.</h3>";
        msgg+= "<div style='font-size:130%'>";
        String link = String.format("<strong><a href='http://i7a202.p.ssafy.io:8888/api/users/verify?token=%s'>인증하기</a>", token);
        msgg+= link;
        msgg+= "</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("noning2025@gmail.com","noning"));//보내는 사람

        javaMailSender.send(message);
    }
    @Override
    public void sendPasswordMail(String email, String password) throws Exception{
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);//보내는 대상
        message.setSubject("noning 임시 비밀번호 발급 안내");//제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 noning입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>새로운 임시 비밀번호를 발급해 드렸습니다. <p>";
        msgg+= "<br>";
        msgg+= "<p>안전을 위해 접속후 반드시 비밀번호를 변경해 주세요. <p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:black;'>임시 비밀번호</h3>";
        msgg+= "<div style='font-size:130%'>";
        String link = String.format("<strong>%s", password);
        msgg+= link;
        msgg+= "</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("noning2025@gmail.com","noning"));//보내는 사람

        javaMailSender.send(message);
    }
}
