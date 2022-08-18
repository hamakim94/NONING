package com.fivenonjangi.noning.data.repository.etc;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommonCodeDTO {
    private String codeId;
    private String upperCodeId;
    private String value;

}
