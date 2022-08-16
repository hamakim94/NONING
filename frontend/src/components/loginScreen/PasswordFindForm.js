import React, {useState, useRef, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputLabel from '../../components/signUp/InputLabel';
import NoCheckInput from '../signUp/NoCheckInput';
import UseAxios from '../../util/UseAxios';
import SignLoading from '../signUp/SignLoading';

export default function PasswordFindForm({navigation}) {
  const inputRef = useRef([]);
  const [emailStyle, setEmailStyle] = useState(styles.blurInput);
  const [nameStyle, setNameStyle] = useState(styles.blurInput);
  const [btn, setBtn] = useState(false);
  const schema = yup.object({
    email: yup
      .string()
      .email('이메일 형식을 사용하세요.')
      .required('필수 항목입니다.'),
    name: yup.string().required('필수 항목입니다.'),
  });
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setBtn(true);
    UseAxios.get('/users/passwords/find', {params: data})
      .then(() => {
        setBtn(false);
        Alert.alert(
          '비밀번호 재전송',
          '해당 이메일로 임시 비밀번호를 보냈습니다, 확인해서 로그인해주세요.',
          [
            {text: '확인', onPress: () => navigation.goBack()},
            {
              text: '취소',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      })
      .catch((err) => {
        setBtn(false);
        Alert.alert(
          '이메일, 이름 확인',
          '이름과 이메일을 다시 한 번 확인해주세요',
          [{text: '확인', style: 'cancel'}],
        );
      });
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View>
        <InputLabel name="이메일"></InputLabel>
        <NoCheckInput
          control={control}
          style={emailStyle}
          setStyle={setEmailStyle}
          property="email"
          errorMessage={errors.email ? errors.email.message : ''}
          styles={styles}
          inputRef={inputRef}
          index={0}
          placeholder={'이메일'}></NoCheckInput>
      </View>
      <View>
        <InputLabel name="이름"></InputLabel>
        <NoCheckInput
          control={control}
          style={nameStyle}
          setStyle={setNameStyle}
          property="name"
          errorMessage={errors.name ? errors.name.message : ''}
          styles={styles}
          inputRef={inputRef}
          index={1}
          login={true}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          placeholder={'회원 이름'}></NoCheckInput>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          index={1}
          style={
            Object.keys(errors).length > 0 ? styles.button : styles.checkButton
          }
          onPress={
            Object.keys(errors).length > 0 ? () => '' : handleSubmit(onSubmit)
          }
          disabled={btn}>
          <Text style={styles.buttonText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <SignLoading isModal={btn}></SignLoading>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  focusInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    height: '80%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  blurInput: {
    width: '100%',
    borderColor: '#808080',
    height: '80%',
    borderRadius: 4,
    borderWidth: 1,
  },
  button: {
    marginBottom: '5%',
    width: '100%',
    color: '#FFFFFF',
    height: 40,
    backgroundColor: 'rgba(255, 95, 95, 0.4)',
    borderRadius: 6,
    justifyContent: 'center',
  },
  checkButton: {
    marginBottom: '5%',
    width: '100%',
    color: '#FFFFFF',
    height: 40,
    backgroundColor: '#FF5F5F',
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  errorText: {
    color: '#FF5F5F',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: '1%',
    textAlignVertical: 'center',
  },
});
