import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TextInput} from 'react-native';
import CommentList from '../../components/boardDetail/CommentList';
import CommentTestData from '../../components/boardDetail/CommentTestData';

function CommentScreen() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(CommentTestData);
  }, []);

  const renderItem = ({item}) => <CommentList comment={item} />;

  return (
    <View style={styles.scene}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={comment => comment.id}
      />
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '2%',
  },
});

export default CommentScreen;
