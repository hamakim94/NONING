import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import UserContext from '../../util/UserContext';
import UseAxios from '../../util/UseAxios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserWithdrawal = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {userData, setUserData} = useContext(UserContext);

  const showAlert = () =>
    Alert.alert(
      '회원 탈퇴',
      '정말 탈퇴 하시겠습니까?',
      [
        {
          text: '탈퇴',
          onPress: () => {
            UseAxios.put(`/users/delete`, null, {
              params: {userId: userData.userId},
            })
              .then(() => {
                AsyncStorage.clear();
                setUserData(null);
              })
              .then(() => {
                navigation.navigate('HomeStack');
              })
              .catch((err) => console.log(err));
          },
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );

  return (
    <View style={styles.wrapper}>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 140, height: 110}}
          source={require('../../assets/header-logo-copy.png')}></Image>
      </View>
      <Text style={{marginTop: 20}}>
        ※ 탈퇴 및 가입을 반복할 경우, 서비스 악용 방지를 위해 재가입이
        제한됩니다.{'\n'}※ 자세한 내용은 개인정보처리방침을 확인해주세요.{'\n'}
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          tintColors={{true: '#FF7171'}}
        />
        <Text
          style={{textAlignVertical: 'center', fontSize: 12, paddingBottom: 1}}
          onPress={() => setToggleCheckBox(!toggleCheckBox)}>
          회원 탈퇴를 진행합니다.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          disabled={!toggleCheckBox}
          style={styles.loginButton(toggleCheckBox)}
          onPress={() => showAlert()}>
          <Text style={styles.loginText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
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
  loginButton: (bool) => ({
    paddingVertical: '1%',
    borderRadius: 6,
    backgroundColor: bool ? '#FF7171' : '#808080',
    marginHorizontal: '1%',
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: bool ? '#FF7171' : '#808080',
  }),
  loginText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#FFFFFF',
    textAlignVeritcal: 'center',
  },
  bottomContainer: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default UserWithdrawal;
