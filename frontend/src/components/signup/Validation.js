import * as yup from 'yup';
const schema = yup.object({
  email: yup
    .string()
    .email('이메일 형식을 사용하세요.')
    .required('필수 항목입니다.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
      '8~16자 영문, 숫자, 특수문자를 사용하세요.',
    )
    .required('필수 항목입니다.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않았습니다.')
    .required('필수 항목입니다.'),
  nickname: yup
    .string()
    .min(2, '2~12자 닉네임을 사용하세요.')
    .max(12, '2~12자 닉네임을 사용하세요.')
    .required('필수 항목입니다.'),
  name: yup.string().required('필수 항목입니다.'),
  gender: yup.string().required('필수 항목입니다.'),
  mbti: yup.string().required('필수 항목입니다.'),
  age: yup
    .number()
    .typeError('숫자만 입력하세요.')
    .required('필수 항목입니다.'),
});
export default schema;
