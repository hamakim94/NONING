import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import React from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';

const showAlert = ({password}) =>
  Alert.alert(
    '회원 탈퇴',
    '정말 탈퇴 하시겠습니까?',
    [
      {text: '획인', onPress: () => console.log(password)},
      {text: '취소', onPress: () => console.log('취소버튼 '), style: 'cancel'},
    ],
    {
      cancelable: true,
    },
  );

const UserWithdrawal = () => {
  const PasswordChangeSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Your password has to have  6 characters')
      .required(),
  });

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{password: ''}}
        onSubmit={values => showAlert(values)}
        validationSchema={PasswordChangeSchema}
        validateOnMount={true}>
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
          <>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>비밀번호*</Text>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length >= 6
                      ? '#ccc'
                      : 'red',
                },
              ]}>
              <TextInput
                placeholderTextColor="#444"
                placeholder="현재 비밀번호"
                autoFocus={true}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <Text style={{color: '#FF5F5F', fontSize: 10}}>
              {1 > values.password.length || values.password.length >= 6
                ? ''
                : '6자 이상 적어주세요'}
            </Text>

            <Text style={{marginVertical: 20}}>
              ※탈퇴 및 가입을 반복할 경우, 서비스 악용 방지를 위해 재가입이
              제한됩니다.{'\n'}
              ※자세한 내용은 개인정보처리방침을 확인해주세요.{'\n'}
              (보통 더 있는데 기능 관련이라 더 생각해봐야할듯여)
            </Text>

            <View style={styles.buttonContainer}>
              <Pressable
                titleSize={20}
                style={styles.button(isValid)}
                onPress={handleSubmit}
                disabled={!isValid}>
                <Text style={styles.buttonText}>회원 탈퇴</Text>
              </Pressable>
              <Pressable
                titleSize={20}
                style={styles.button(false)}
                disabled={!isValid}>
                <Text style={styles.buttonText}>취소</Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 60,
  },
  inputField: {
    borderRadius: 4,
    borderColor: 'gray',
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
    minHeight: 40,
  },
  button: isValid => ({
    backgroundColor: isValid ? '#FF5F5F' : 'rgba(255,95,95,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    width: 100,
    borderRadius: 10,
  }),
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 50,
  },
});
export default UserWithdrawal;
