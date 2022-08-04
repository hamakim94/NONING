import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import LoginForm from '../../components/loginScreen/LoginForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => (
  <View style={styles.container}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/LoginLogo.jpg')}></Image>
      </View>
      <LoginForm navigation={navigation}></LoginForm>
      <View style={styles.passwordSignupContainer}>
        <View style={{flex: 1, alignItems: 'center', paddingLeft: '5%'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PasswordChangeScreen', {
                screen: 'PasswordChangeScreen',
              })
            }>
            <Text style={{color: '#FF5F5F'}}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, alignItems: 'center', paddingRight: '5%'}}>
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
    backgroundColor: 'white',

    paddingHorizontal: 0,
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
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default LoginScreen;
