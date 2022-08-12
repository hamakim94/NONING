import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TosText from '../../components/common/TosText';
import PrivacyText from '../../components/common/PrivacyText';

const windowWidth = Dimensions.get('screen').width;

function ApproveScreen({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 12, marginVertical: '1%', textAlign: 'center'}}>
        회원가입을 위해 이용약관, 개인정보처리방침에 동의하셔야 합니다
      </Text>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <TosText />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: '5%',
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          tintColors={{true: '#FF5F5F'}}
        />
        <Text
          style={{textAlignVertical: 'center', fontSize: 12, paddingBottom: 1}}
          onPress={() => setToggleCheckBox(!toggleCheckBox)}>
          위의 이용약관에 동의합니다.
        </Text>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <PrivacyText />
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: '5%',
        }}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox2}
          onValueChange={(newValue) => setToggleCheckBox2(newValue)}
          tintColors={{true: '#FF5F5F'}}
        />
        <Text
          style={{textAlignVertical: 'center', fontSize: 12, paddingBottom: 1}}
          onPress={() => setToggleCheckBox2(!toggleCheckBox2)}>
          위의 개인정보 수집 및 이용에 대한 안내에 동의합니다.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.homeText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!(toggleCheckBox && toggleCheckBox2)}
          style={styles.loginButton(toggleCheckBox && toggleCheckBox2)}
          onPress={() => navigation.navigate('InfoScreen')}>
          <Text style={styles.loginText}>등록</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000000',
    marginVertical: '1%',
    marginHorizontal: 16,
    paddingVertical: '3%',
    paddingHorizontal: '4%',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  loginButton: (bool) => ({
    borderRadius: 6,
    backgroundColor: bool ? '#FF5F5F' : '#808080',
    height: 40,
    marginLeft: 8,
    width: (windowWidth - 32) / 2 - 8,
    borderWidth: 1,
    borderColor: bool ? '#FF5F5F' : '#808080',
    justifyContent: 'center',
  }),
  homeButton: {
    marginRight: 8,
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

export default ApproveScreen;
