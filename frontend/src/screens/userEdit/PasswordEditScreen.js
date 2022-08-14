import React, {useState, useRef, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserContext from '../../util/UserContext';
import UseAxios from '../../util/UseAxios';

function PasswordEditScreen({navigation}) {
  const {userData} = useContext(UserContext);
  const inputRef = useRef([]);
  const [currentpwStyle, setCurrentPwStyle] = useState(styles.blurInput);
  const [pwStyle, setPwStyle] = useState(styles.blurInput);
  const [pwConfirmStyle, setPwConfirmStyle] = useState(styles.blurInput);
  const schema = yup.object({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        '8~16자 영문, 숫자, 특수문자를 사용하세요.',
      )
      .required('필수 항목입니다.'),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        '8~16자 영문, 숫자, 특수문자를 사용하세요.',
      )
      .required('필수 항목입니다.'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], '비밀번호가 일치하지 않았습니다.')
      .required('필수 항목입니다.'),
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      newPassword: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const blank = /\s/g;

  const onSubmit = (data) => {
    UseAxios.put('/users/passwords/edit', {
      password: data.password,
      newPassword: data.newPassword,
      userId: userData.userId,
    })
      .then(() => {
        navigation.navigate('HomeStack');
      })
      .catch(() => {
        alert('비밀번호 오류');
      });
  };
  // Alert.alert('비밀번호 변경', '변경하시겠습니까?', [
  //   {
  //     text: '확인',
  //     onPress: () => ,
  //   },
  //   {
  //     text: '취소',
  //     onPress: () => {},
  //   },
  // console.log('취소버튼'), style: 'cancel'},

  return (
    <View style={styles.container}>
      <View style={styles.currentPasswordContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>현재 비밀번호</Text>
          <Text style={styles.labelStar}>*</Text>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={currentpwStyle}
                blurOnSubmit={false}
                onFocus={() => setCurrentPwStyle(styles.focusInput)}
                onBlur={() => setCurrentPwStyle(styles.blurInput)}
                onChangeText={(value) => onChange(value.replace(blank, ''))}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => inputRef.current[1].focus()}
                secureTextEntry={true}
              />
            </View>
          )}
          name="password"
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>
      <View style={styles.newPasswordContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>새 비밀번호</Text>
          <Text style={styles.labelStar}>*</Text>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={pwStyle}
                blurOnSubmit={false}
                ref={(el) => (inputRef.current[1] = el)}
                onFocus={() => setPwStyle(styles.focusInput)}
                onBlur={() => setPwStyle(styles.blurInput)}
                onChangeText={(value) => onChange(value.replace(blank, ''))}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => inputRef.current[2].focus()}
                secureTextEntry={true}
              />
            </View>
          )}
          name="newPassword"
        />
        {errors.newPassword ? (
          <Text style={styles.errorText}>{errors.newPassword.message}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={pwConfirmStyle}
                blurOnSubmit={false}
                ref={(el) => (inputRef.current[2] = el)}
                onFocus={() => setPwConfirmStyle(styles.focusInput)}
                onBlur={() => setPwConfirmStyle(styles.blurInput)}
                onChangeText={(value) => onChange(value.replace(blank, ''))}
                value={value}
                returnKeyType="next"
                secureTextEntry={true}
              />
            </View>
          )}
          name="passwordConfirm"
        />
        {errors.passwordConfirm ? (
          <Text style={styles.errorText}>{errors.passwordConfirm.message}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          index={3}
          style={
            Object.keys(errors).length > 0 ? styles.button : styles.checkButton
          }
          onPress={
            Object.keys(errors).length > 0 ? () => '' : handleSubmit(onSubmit)
          }>
          <Text style={styles.buttonText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    color: '#000000',
    textAlignVertical: 'bottom',
    marginLeft: '1%',
    fontWeight: 'bold',
  },
  labelStar: {
    color: '#FF5F5F',
    textAlignVertical: 'top',
    paddingBottom: '1%',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '1.5%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '10%',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  currentPasswordContainer: {
    position: 'absolute',
    top: 30,
    left: 16,
    right: 16,
  },
  newPasswordContainer: {
    position: 'absolute',
    top: 110,
    left: 16,
    right: 16,
  },
  focusInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  blurInput: {
    width: '100%',
    borderColor: '##FFFFFF',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },

  buttonContainer: {
    position: 'absolute',
    top: 150,
    height: 200,
    left: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '100%',
    color: '#FFFFFF',
    height: 40,
    backgroundColor: '#808080',
    borderRadius: 6,
    justifyContent: 'center',
  },
  checkButton: {
    width: '100%',
    height: 40,
    color: '#FFFFFF',
    backgroundColor: '#FF5F5F',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
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

export default PasswordEditScreen;
