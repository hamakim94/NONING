import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CommentList from './CommentList';
import CommentTestData from './CommentTestData';

function CommentScreen() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(CommentTestData);
  }, []);
  const renderItem = ({item}) => <CommentList comment={item} />;
  return (
    <View
      style={[
        styles.scene,
        {
          backgroundColor: 'white',
          marginTop: '2%',
        },
      ]}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={comment => comment.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
  },
});

export default CommentScreen;
