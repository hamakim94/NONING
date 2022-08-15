import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import CommentList from '../../components/boardDetail/CommentList';
import {useIsFocused} from '@react-navigation/native';
import DetailContext from '../../components/boardDetail/DetailContext';
import UseAxios from '../../util/UseAxios';
import Feather from 'react-native-vector-icons/Feather';
import CommentContext from '../../components/boardDetail/CommentContext';

function CommentScreen({board, focusInput}) {
  const isFocused = useIsFocused();
  const [comments, setComments] = useState([]);
  const {boardId, participants} = useContext(DetailContext);
  const [content, setContent] = useState();
  const [parentComment, setParentComment] = useState();
  const [nested, setNested] = useState(false);
  const [checkWrite, SetCheckWrite] = useState(false);
  const [writerNickname, setWriterNickname] = useState();

  useEffect(() => {
    if (isFocused) {
      UseAxios.get(`/boards/${boardId}/comments/list`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => {});
    }
  }, [isFocused, checkWrite]);

  useEffect(() => {
    if (nested) {
      setWriterNickname(
        participants.find(
          (e) =>
            e.userId ==
            comments.find((e) => e.commentId === parentComment).writerId,
        ).nickname,
      );
    }
  }, [parentComment]);

  const renderItem = ({item}) => (
    <CommentList
      comment={item}
      nested={nested}
      setNested={setNested}
      checkWrite={checkWrite}
    />
  );
  const onChange = (e) => {
    setContent(e);
  };
  const onSubmit = () => {
    UseAxios.post(`/boards/${boardId}/comments/write`, {
      content: content,
      level: nested ? 1 : 0,
      parentId: nested ? parentComment : 0,
    })
      .then((res) => {
        // console.log(res);
        SetCheckWrite(!checkWrite);
      })
      .catch((err) => {
        // console.log(err);
      });
    setContent('');
    Keyboard.dismiss();
  };
  const cancelNest = () => {
    setNested(false);
  };
  return (
    <CommentContext.Provider value={{setParentComment, setComments, comments}}>
      <View style={styles.scene}>
        {board ? (
          board.userVote > 0 ? (
            <>
              <FlatList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(comment) => comment.commentId}
              />
            </>
          ) : (
            <Text>투표를 해야만 댓글을 볼 수 있습니다.</Text>
          )
        ) : (
          ''
        )}
      </View>
      {board ? (
        board.userVote > 0 ? (
          <View>
            {nested ? (
              <View
                style={{
                  marginBottom: 3,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    paddingHorizontal: 16,
                    color: '#FF5F5F',
                  }}>
                  {writerNickname}님에게 답글 다는 중
                </Text>
                <TouchableOpacity
                  style={{paddingRight: 16, justifyContent: 'center'}}
                  onPress={cancelNest}>
                  <Feather name="x" color="#808080" size={13} />
                </TouchableOpacity>
              </View>
            ) : (
              ''
            )}
            <View
              style={{
                flexDirection: 'row',
                maxHeight: 40,
                borderTopWidth: 0.5,
                borderColor: '#A6A6A6',
                paddingHorizontal: 16,
              }}>
              <View
                style={{
                  flex: 5.2,
                }}>
                <TextInput
                  onChangeText={(e) => onChange(e)}
                  value={content}
                  style={{
                    borderColor: '#A6A6A6',
                  }}
                  selectionColor={'#FF5F5F'}
                  placeholder={'댓글을 입력해주세요.'}
                  onSubmitEditing={onSubmit}></TextInput>
              </View>
              <View
                style={{
                  flex: 0.8,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={onSubmit}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: '#FF5F5F',
                    }}>
                    게시
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </CommentContext.Provider>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '2%',
    paddingHorizontal: 16,
  },
});

export default CommentScreen;
