import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import DeleteModal from './DeleteModal';
import UserContext from '../../util/UserContext';
import DetailContext from './DetailContext';
import CommentContext from './CommentContext';

export default function CommentModal({data, setReplys, replys}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const {userData} = useContext(UserContext);
  const {boardId} = useContext(DetailContext);
  const {setComments, comments} = useContext(CommentContext);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const deleteComment = () => {
    setDeleteModal(false);
    if (data.writerId == userData.userId)
      UseAxios.put(`/boards/${boardId}/comments/${data.commentId}/delete`)
        .then((res) => {
          // console.log(res);
          setComments(
            comments.filter((comment) => data.commentId !== comment.commentId),
          );
          setReplys(
            replys.filter((comment) => data.commentId !== comment.commentId),
          );
        })
        .catch((err) => {
          // console.log(err);
        });
    else {
      alert('본인 글만 삭제할 수 있습니다.');
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Entypo name="dots-three-vertical" color="black" size={13} />
      </TouchableOpacity>
      <Modal
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down"
        backdropOpacity={0.3}>
        <View style={styles.modalContainer}>
          {data.writerId === userData.userId ? (
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => [setModalVisible(false), setDeleteModal(true)]}>
              <Text style={[styles.modalText, {color: '#000000'}]}>
                삭제하기
              </Text>
            </TouchableOpacity>
          ) : (
            ''
          )}
          <TouchableOpacity style={styles.textBox} onPress={toggleModal}>
            <Text style={[styles.modalText, {color: '#FF5F5F'}]}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        comment={'작성한 댓글(대댓글 포함)이 삭제 됩니다'}
        data={data}
        deleteBtn={deleteComment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 0.7,
  },
});
