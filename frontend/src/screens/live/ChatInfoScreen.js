import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UseAxios from '../../util/UseAxios';

export default function ChatInfoScreen({navigation, route}) {
  const [board, setBoard] = useState({});
  const boardId = route.params.id;

  useEffect(() => {
    UseAxios.get(`/boards/${boardId}`).then(res => {
      setBoard(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <View style={styles.topInner}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChatScreen', {data: board})}>
              <Text>chatckte</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  topInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
