import * as yup from 'yup';
const schemaProfileEdit = yup.object({
  nickname: yup
    .string()
    .min(2, '2~12자 닉네임을 사용하세요.')
    .max(12, '2~12자 닉네임을 사용하세요.')
    .required('필수 항목입니다.'),
  mbti: yup.string().required('필수 항목입니다.'),
  age: yup
    .number()
    .typeError('숫자만 입력하세요.')
    .required('필수 항목입니다.'),
});
export default schemaProfileEdit;
