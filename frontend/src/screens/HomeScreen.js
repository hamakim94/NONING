import React from 'react';
import {Button, View} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="회원가입"
        onPress={() => navigation.navigate('SignUpNav')}
      />
      <Button
        title="프로필수정"
        onPress={() => navigation.navigate('ProfileEdit')}
      />
      <Button
        title="비밀번호수정"
        onPress={() => navigation.navigate('PasswordEdit')}
      />
    </View>
  );
}

export default HomeScreen;
