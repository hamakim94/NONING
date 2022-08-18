import React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

export default function SignLoading({isModal, setIsModal}) {
  const deviceHeight = Dimensions.get('window').height;
  return (
    <>
      <Modal
        style={{justifyContent: 'center', alignItems: 'center'}}
        deviceHeight={deviceHeight}
        isVisible={isModal}
        backdropOpacity={0.3}>
        <View style={styles.container}>
          <Image
            style={{
              height: 55,
              width: 70,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            source={require('../../components/common/header-logo.png')}></Image>
          <View style={styles.textBox}>
            <Text style={styles.modalText}>잠시만 기다려주세요</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  textBox: {
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    paddingVertical: '8%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
