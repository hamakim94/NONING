import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const windowWidth = Dimensions.get('screen').width;
function CompleteScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Icon name="check" size={100} color="#FF5F5F" />
        <Text style={styles.completeText}>
          회원가입이 <Text style={styles.highlightText}>완료</Text> 되었습니다
        </Text>
        <Text style={styles.completeText2}>
          <Text style={styles.highlightText}>이메일 인증</Text> 후 로그인
          해주세요!
        </Text>
        <View style={{flexDirection: 'row', marginTop: '10%'}}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('HomeStack')}>
            <Text style={styles.homeText}>홈으로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton(true)}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  topContainer: {
    flex: 3,
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
  },
  completeText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
    marginTop: '10%',
  },
  completeText2: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 10,
  },
  highlightText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF5F5F',
  },
  loginButton: (bool) => ({
    borderRadius: 6,
    backgroundColor: bool ? '#FF5F5F' : '#808080',
    height: 40,
    width: (windowWidth - 32) / 2 - 8,
    borderWidth: 1,
    borderColor: bool ? '#FF5F5F' : '#808080',
    justifyContent: 'center',
    marginLeft: 16,
  }),
  homeButton: {
    marginLeft: 0,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    width: (windowWidth - 32) / 2 - 8,
    borderWidth: 1,

    justifyContent: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#FFFFFF',
    textAlignVeritcal: 'center',
  },
  homeText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    textAlignVeritcal: 'center',
    color: '#000000',
  },
});

export default CompleteScreen;
