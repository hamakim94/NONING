import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function LogoSearch({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../common/header-logo.png')}></Image>
      </TouchableOpacity>

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchNav', {screen: 'SearchNav'})
          }>
          <Image
            source={{
              uri: 'https://img.icons8.com/material-outlined/60/000000/search--v1.png',
            }}
            style={styles.icon}></Image>
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
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
