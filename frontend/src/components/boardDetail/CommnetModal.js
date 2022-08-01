import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import DeleteModal from './DeleteModal';

export default function CommentModal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Entypo name="dots-three-vertical" color="black" size={13} />
        <Modal
          style={{margin: 0, justifyContent: 'flex-end'}}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onSwipeComplete={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          swipeDirection="down"
          backdropOpacity={0.3}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => [setModalVisible(false), setDeleteModal(true)]}>
              <Text style={[styles.modalText, {color: '#000000'}]}>
                삭제하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textBox} onPress={toggleModal}>
              <Text style={[styles.modalText, {color: '#FF5F5F'}]}>닫기</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        comment={'작성한 댓글(대댓글 포함)이 삭제 됩니다'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderWidth: 0.5,
  },
  textBox: {
    paddingVertical: '5%',
    borderBottomWidth: 0.3,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  deleteContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.7,
  },
});
