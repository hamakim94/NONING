import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import LoginForm from '../../components/loginScreen/LoginForm';

const INSTAGRAM_LOGO =
  'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-256.png';

const LoginScreen = ({navigation}) => (
  <View style={styles.container}>
    <View style={styles.logoContainer}>
      <Image source={{uri: INSTAGRAM_LOGO, height: 70, width: 70}}></Image>
      <LoginForm></LoginForm>
      <View style={styles.passwordSignupContainer}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PasswordChangeScreen', {
                screen: 'PasswordChangeScreen',
              })
            }>
            <Text style={{color: '#FF5F5F'}}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SignUpNav', {screen: 'SignUpNav'})
            }>
            <Text style={{color: '#FF5F5F'}}>회원 가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 0,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  passwordSignupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
