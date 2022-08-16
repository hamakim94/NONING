import {Alert} from 'react-native';

const LoginAlert = (navigation) => {
  Alert.alert('로그인 필요', '로그인 하시겠습니까?', [
    {
      text: '로그인',

      onPress: () => {
        navigation.navigate('LoginNav', {screen: 'LoginNav'});
      },
    },
    {
      text: '취소',
      onPress: () => {},
    },
    // console.log('취소버튼'), style: 'cancel'},
  ]);
};

export default LoginAlert;
