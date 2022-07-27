import React, {useState, useRef} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function PasswordEditScreen() {
  const inputRef = useRef([]);
  const [currentpwStyle, setCurrentPwStyle] = useState(styles.blurInput);
  const [pwStyle, setPwStyle] = useState(styles.blurInput);
  const [pwConfirmStyle, setPwConfirmStyle] = useState(styles.blurInput);
  const schema = yup.object({
    currentPw: yup
      .string()
      .matches(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        '8~16자 영문, 숫자, 특수문자를 사용하세요.',
      )
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
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      currentPw: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(schema),
  });

  const blank = /\s/g;

  const onSubmit = data => {
    console.log(data);
  };

  console.log(errors);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
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
                onChangeText={value => onChange(value.replace(blank, ''))}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => inputRef.current[1].focus()}
                secureTextEntry={true}
              />
            </View>
          )}
          name="currentPw"
        />
        {errors.currentPw ? (
          <Text style={styles.errorText}>{errors.currentPw.message}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}

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
                ref={el => (inputRef.current[1] = el)}
                onFocus={() => setPwStyle(styles.focusInput)}
                onBlur={() => setPwStyle(styles.blurInput)}
                onChangeText={value => onChange(value.replace(blank, ''))}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => inputRef.current[2].focus()}
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

        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={pwConfirmStyle}
                blurOnSubmit={false}
                ref={el => (inputRef.current[2] = el)}
                onFocus={() => setPwConfirmStyle(styles.focusInput)}
                onBlur={() => setPwConfirmStyle(styles.blurInput)}
                onChangeText={value => onChange(value.replace(blank, ''))}
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
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'black',
    textAlignVertical: 'bottom',
    marginLeft: '1%',
    fontWeight: 'bold',
  },
  labelStar: {
    color: '#FF7171',
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
    paddingTop: '1%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  focusInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  blurInput: {
    width: '100%',
    borderColor: '#808080',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },
});

export default PasswordEditScreen;
