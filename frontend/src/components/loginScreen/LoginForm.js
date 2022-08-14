import React, {useState, useRef, useContext} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputLabel from '../../components/signUp/InputLabel';
import NoCheckInput from '../signUp/NoCheckInput';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm({navigation}) {
  const inputRef = useRef([]);
  const [emailStyle, setEmailStyle] = useState(styles.blurInput);
  const [pwStyle, setPwStyle] = useState(styles.blurInput);
  const {userData, setUserData} = useContext(UserContext);
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
  });
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    UseAxios.post('/users/login', data)
      .then((res) => {
        AsyncStorage.setItem('accesstoken', res.headers.accesstoken);
        AsyncStorage.setItem('refreshtoken', res.headers.refreshtoken);
        AsyncStorage.setItem('userId', JSON.stringify(res.data.userId));
        setUserData(res.data);
        // console.log(res.headers.accesstoken);
        // console.log(res.headers.refreshtoken);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Alert.alert(
            'ID / 비밀번호 오류',
            'ID 혹은 비밀번호가 일치하지 않습니다.',
            [
              {
                text: '로그인 화면으로 돌아가기',
              },
              {
                text: '비밀번호 찾기',
                style: 'OK',
                onPress: () => navigation.navigate('PasswordFindScreen'),
              },
            ],
          );
        }
        console.log(err.response.status === 401);
      });
  };
  return (
    <View
      style={{
        flex: 2,
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
        <InputLabel name="비밀번호"></InputLabel>
        <NoCheckInput
          control={control}
          style={pwStyle}
          setStyle={setPwStyle}
          property="password"
          errorMessage={errors.password ? errors.password.message : ''}
          styles={styles}
          inputRef={inputRef}
          index={1}
          blind={true}
          login={true}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          placeholder={'8~16자 영문, 숫자, 특수문자'}></NoCheckInput>
      </View>
      <View style={{alignItems: 'center', marginVertical: '3%'}}>
        <TouchableOpacity
          index={2}
          style={
            Object.keys(errors).length > 0 ? styles.button : styles.checkButton
          }
          onPress={
            Object.keys(errors).length > 0 ? () => '' : handleSubmit(onSubmit)
          }>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  focusInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    paddingHorizontal: '2%',
    height: '80%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  blurInput: {
    width: '100%',
    borderColor: '#808080',
    paddingHorizontal: '2%',
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
    color: '#FFFFFF',
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
