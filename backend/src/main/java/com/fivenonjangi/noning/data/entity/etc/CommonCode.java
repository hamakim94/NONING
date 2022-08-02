package com.fivenonjangi.noning.data.entity.etc;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "common_code")
public class CommonCode {
    @Id
    @Column(name = "code_id")
    String codeId;
    @Column(name = "upper_code_id")
    String upperCodeId;
    String value;
}
