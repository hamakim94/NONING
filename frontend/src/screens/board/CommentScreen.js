import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import CommentList from '../../components/boardDetail/CommentList';
import {useIsFocused} from '@react-navigation/native';
import DetailContext from '../../components/boardDetail/DetailContext';
import UseAxios from '../../util/UseAxios';
import CommentContext from '../../components/boardDetail/CommentContext';

function CommentScreen({board}) {
  const isFocused = useIsFocused();
  const [comments, setComments] = useState([]);
  const {boardId} = useContext(DetailContext);
  const [content, setContent] = useState();
  const [parentComment, setParentComment] = useState();
  const [nested, setNested] = useState(false);
  useEffect(() => {
    if (isFocused) {
      UseAxios.get(`/boards/${boardId}/comments/list`)
        .then(res => {
          setComments(res.data);
        })
        .catch(err => {});
    }
  }, [isFocused]);
  const renderItem = ({item}) => (
    <CommentList comment={item} setNested={setNested} />
  );
  const onChange = e => {
    setContent(e);
  };
  const onSubmit = () => {
    // const data = {
    //   msgId: chatRef.current,
    //   msg: msg,
    //   nickname: userData.nickname,
    //   userVote: boardData.userVote,
    // };
    // setMessageData([...messageData, data]);
    UseAxios.post(`/boards/${boardId}/comments/write`, {
      content: content,
      level: nested ? 1 : 0,
      parentId: nested ? parentComment : 0,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    setContent('');
    Keyboard.dismiss();
  };
  return (
    <CommentContext.Provider value={{setParentComment}}>
      <View style={styles.scene}>
        {board ? (
          board.userVote > 0 ? (
            <>
              <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={comment => comment.commentId}
              />
              {nested ? <Text>답글 다는 중</Text> : ''}
              <TextInput
                onChangeText={e => onChange(e)}
                value={content}
                onSubmitEditing={onSubmit}></TextInput>
            </>
          ) : (
            <Text>투표를 해야만 댓글을 볼 수 있습니다.</Text>
          )
        ) : (
          ''
        )}
      </View>
    </CommentContext.Provider>
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
