import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CommentItem from './CommentItem';
import ReplyList from './ReplyList';
import DetailContext from './DetailContext';
import UseAxios from '../../util/UseAxios';

function CommentList({comment, setNested, checkWrite, replyCheck}) {
  const [commentIsopened, setCommentIsopened] = useState(false);
  const [commentData, setCommentData] = useState(comment);
  const [replys, setReplys] = useState(null);
  const [writerData, setWriterData] = useState(null);
  const {boardId, participants} = useContext(DetailContext);

  useEffect(() => {
    if (participants) {
      setWriterData(
        participants.filter((prev) => prev.userId == commentData.writerId),
      );
    }
  }, [participants]);
  useEffect(() => {
    UseAxios.get(`/boards/${boardId}/comments/${commentData.commentId}/list`)
      .then((res) => {
        // console.log(res);
        setReplys(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [checkWrite]);
  useEffect(() => {
    if (replyCheck) {
      setCommentIsopened(true);
    }
  }, [replyCheck]);
  const renderItem = ({item}) => (
    <ReplyList reply={item} replys={replys} setReplys={setReplys} />
  );

  return (
    <View>
      <View style={{marginVertical: '2%'}}>
        <CommentItem
          commentData={commentData}
          setCommentData={setCommentData}
          writerData={writerData}
          commentIsopened={commentIsopened}
          setCommentIsopened={setCommentIsopened}
          setNested={setNested}
          replys={replys}
          isReply={false}></CommentItem>
      </View>
      {commentIsopened ? (
        <View>
          <FlatList
            data={replys}
            renderItem={renderItem}
            keyExtractor={(reply) => reply.commentId}
            scrollEnabled={false}
          />
        </View>
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo(CommentList);
