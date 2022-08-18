import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from '../../util/UserContext';
import LoginAlert from '../../util/LoginAlert';

export default function LogoSearch({navigation}) {
  const {userData} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../common/로공공.png')}></Image>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() =>
            userData === null
              ? LoginAlert(navigation)
              : navigation.navigate('SearchNav', {screen: 'SearchNav'})
          }>
          <Ionicons
            name={'search'}
            size={20}
            color={'#000000'}
            style={{resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: '7%',
    paddingHorizontal: 16,
  },
  logo: {
    width: 70,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
