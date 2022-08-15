import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';

export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  comment,
  deleteBtn,
}) {
  const deviceHeight = Dimensions.get('window').height;
  return (
    <>
      <Modal
        style={{justifyContent: 'center'}}
        deviceHeight={deviceHeight}
        isVisible={deleteModal}
        onBackdropPress={() => setDeleteModal(false)}
        onSwipeComplete={() => setDeleteModal(false)}
        onBackButtonPress={() => setDeleteModal(false)}
        swipeDirection="left"
        backdropOpacity={0.3}>
        <View style={styles.deleteContainer}>
          <View style={styles.textBox}>
            <Text style={styles.modalText}>{comment}</Text>
          </View>
          <View style={styles.bottomModalbox}>
            <TouchableOpacity style={styles.bottomBox} onPress={deleteBtn}>
              <Text style={styles.modalText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomBox}
              onPress={() => setDeleteModal(false)}>
              <Text style={styles.modalText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  textBox: {
    paddingVertical: '5%',
    width: '100%',
    alignItems: 'center',
    marginBottom: '5%',
  },
  modalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  deleteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    padding: '5%',
  },
  bottomModalbox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomBox: {
    marginHorizontal: '10%',
  },
});
