import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

function UploadModeModal({
  visible,
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}) {
  return (
    <View>
      <Modal
        visible={visible}
        style={styles.background}
        animationType="fade"
        onBackdropPress={onClose}
        onRequestClose={onClose}>
        <TouchableOpacity onPress={onClose}>
          <View style={styles.whiteBox}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                onLaunchCamera();
                onClose();
              }}>
              <Icon
                name="camera-alt"
                color="#757575"
                size={24}
                style={styles.icon}
              />
              <Text style={styles.actionText}>카메라로 촬영하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                onLaunchImageLibrary();
                onClose();
              }}>
              <Icon
                name="photo"
                color="#757575"
                size={24}
                style={styles.icon}
              />
              <Text style={styles.actionText}>사진 선택하기</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
});

export default UploadModeModal;
