import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import CommentList from '../../components/boardDetail/CommentList';
import {useIsFocused} from '@react-navigation/native';

function CommentScreen({boardId, participants}) {
  const isFocused = useIsFocused();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (isFocused) {
      UseAxios.get(`/boards/${boardId}/comments/list`).then(res => {
        setComments(res.data);
      });
    }
  }, [isFocused]);
  const renderItem = ({item}) => (
    <CommentList comment={item} participants={participants} />
  );

  return (
    <View style={styles.scene}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={comment => comment.commentId}
      />
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '2%',
  },
});

export default CommentScreen;
