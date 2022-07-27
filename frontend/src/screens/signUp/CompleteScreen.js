import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

function CompleteScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Icon name="check" size={100} color="#FF5F5F" />
        <Text style={styles.completeText}>
          회원가입이 <Text style={styles.highlightText}>완료</Text> 되었습니다
        </Text>
        <View style={{flexDirection: 'row', marginTop: '20%'}}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.homeText}>홈으로</Text>
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
    backgroundColor: 'white',
  },
  topContainer: {
    flex: 3,
    width: '90%',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    width: '90%',
    marginVertical: 10,
  },
  completeText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
    marginTop: '10%',
  },
  highlightText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF5F5F',
  },
  loginButton: {
    paddingVertical: '2%',
    borderRadius: 6,
    backgroundColor: '#FF5F5F',
    alignSelf: 'center',
    marginHorizontal: '1%',
    minWidth: '30%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#FF5F5F',
  },
  loginText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    textAlignVeritcal: 'center',
  },
  homeButton: {
    paddingVertical: '2%',
    borderRadius: 6,
    backgroundColor: 'white',
    marginHorizontal: '1%',
    minWidth: '30%',
    borderWidth: 1,
  },
  homeText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVeritcal: 'center',
    color: 'black',
  },
});

export default CompleteScreen;
