import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function LiveLogoSearch() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          style={styles.logo}
          source={require('../common/로공공.png')}></Image>
      </TouchableOpacity>
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
