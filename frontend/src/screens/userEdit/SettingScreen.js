import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext} from 'react';
import {Divider} from '@rneui/themed';
import UseAxios from '../../util/UseAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../../util/UserContext';

function SettingScreen({navigation}) {
  const {setUserData} = useContext(UserContext);
  const showAlert = () =>
    Alert.alert(
      '',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '확인',
          onPress: () => {
            UseAxios.get('/users/logout')
              .then((res) => {
                navigation.navigate('HomeStack');
                AsyncStorage.clear();
                setUserData(null);
              })
              .catch((err) => {
                // console.log(err);
              });
          },
        },
        {
          text: '취소',
          onPress: () => {},
        },
        // console.log('취소버튼'), style: 'cancel'},
      ],
      {
        cancelable: true,
        onDismiss: () => Alert.alert('밖 누르지 마'),
      },
    );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() =>
          navigation.push('ProfileEditScreen', {screen: 'ProfileEditScreen'})
        }>
        <Text style={styles.menuText}>프로필 편집 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() =>
          navigation.push('PasswordEditScreen', {screen: 'PasswordEditScreen'})
        }>
        <Text style={styles.menuText}>비밀번호 변경 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() =>
          navigation.push('InquiryScreen', {screen: 'InquiryScreen'})
        }>
        <Text style={styles.menuText}>문의하기 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.push('TosScreen', {screen: 'TosScreen'})}>
        <Text style={styles.menuText}>서비스 이용약관 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() =>
          navigation.push('PrivacyScreen', {screen: 'PrivacyScreen'})
        }>
        <Text style={styles.menuText}>개인정보 처리방침</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer} onPress={showAlert}>
        <Text style={styles.menuText}>로그아웃 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() =>
          navigation.push('UserWithdrawalScreen', {
            screen: 'UserWithdrawalScreen',
          })
        }>
        <Text style={styles.menuText}>회원탈퇴 </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
  menuContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#A6A6A6',
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SettingScreen;
