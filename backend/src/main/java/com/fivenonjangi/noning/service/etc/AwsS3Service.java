package com.fivenonjangi.noning.service.etc;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3Service {
    String uploadFileV1(String category, MultipartFile multipartFile) throws Exception;
}
