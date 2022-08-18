import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import LoginForm from '../../components/loginScreen/LoginForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => (
  <View style={styles.container}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={{height: 25}}></View>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../components/common/header-logo.png')}></Image>
      </View>
      <LoginForm navigation={navigation}></LoginForm>
      <View style={styles.passwordSignupContainer}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PasswordFindScreen', {
                screen: 'PasswordFindScreen',
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
    </KeyboardAwareScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: '10%',
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
    width: 135,
    height: 105,
  },
});

export default LoginScreen;
