import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import CommentList from '../../components/boardDetail/CommentList';
import {useIsFocused} from '@react-navigation/native';
import DetailContext from '../../components/boardDetail/DetailContext';

function CommentScreen() {
  const isFocused = useIsFocused();
  const [comments, setComments] = useState([]);
  const {boardId} = useContext(DetailContext);
  useEffect(() => {
    if (isFocused) {
      UseAxios.get(`/boards/${boardId}/comments/list`).then(res => {
        setComments(res.data);
      });
    }
  }, [isFocused]);
  const renderItem = ({item}) => <CommentList comment={item} />;
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
