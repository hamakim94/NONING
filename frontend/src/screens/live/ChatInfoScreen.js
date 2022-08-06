import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import UseAxios from '../../util/UseAxios';

export default function ChatInfoScreen({route}) {
  const [board, setBoard] = useState({});
  const boardId = route.params.id;

  useEffect(() => {
    UseAxios.get(`/boards/${boardId}`).then(res => {
      setBoard(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}></View>
        <View style={styles.bottomContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: '5%',
  },
  topContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  bottomContainer: {
    flex: 1,
  },
});
