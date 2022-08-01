import * as yup from 'yup';
const schema = yup.object({
    title: yup
    .string()
    .min(5, '논쟁 제목은 최소 5자 이상입니다.')
    .max(20, '최대 15자까지 입력 가능합니다.')
    .required('필수 항목입니다.'),
    argu1: yup
    .string()
    .min(1, '최소 1자 이상 입력해 주세요.')
    .max(15, '최대 15자까지 입력 가능합니다.')
    .required('필수 항목입니다.'),
    argu2: yup
    .string()
    .min(1, '최소 1자 이상 입력해 주세요.')
    .max(15, '최대 15자까지 입력 가능합니다.')
    .required('필수 항목입니다.'),
});
export default schema;
