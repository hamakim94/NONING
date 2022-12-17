import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PasswordFindForm from '../../components/loginScreen/PasswordFindForm';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const PasswordFindScreen = ({navigation}) => (
  <View style={styles.container}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.logoContainer}>
        <View style={styles.logoImageContainer}>
          <FontAwesome name="lock" size={70} color="white"></FontAwesome>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            로그인에 문제가 있나요?
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text>이름과 ID(이메일)을 입력하면</Text>
          <Text>작성한 이메일 주소로</Text>
          <Text>임시 비밀번호를 보내드립니다</Text>
        </View>
      </View>
      <PasswordFindForm navigation={navigation}></PasswordFindForm>
    </KeyboardAwareScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoImageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#FF5F5F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  passwordSignupContainer: {
    flex: 1,
    marginTop: '1%',
    flexDirection: 'row',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default PasswordFindScreen;
