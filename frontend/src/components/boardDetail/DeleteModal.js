import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';
import DetailContext from './DetailContext';
export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  comment,
  data,
}) {
  const deviceHeight = require('react-native-extra-dimensions-android').get(
    'REAL_WINDOW_HEIGHT',
  );
  const {userData} = useContext(UserContext);
  const {boardId} = useContext(DetailContext);
  const deleteComment = () => {
    setDeleteModal(false);
    if (data.writerId == userData.userId)
      UseAxios.put(`/boards/${boardId}/comments/${data.commentId}/delete`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    else {
      alert('본인 글만 삭제할 수 있습니다.');
    }
  };
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
            <TouchableOpacity style={styles.bottomBox} onPress={deleteComment}>
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
