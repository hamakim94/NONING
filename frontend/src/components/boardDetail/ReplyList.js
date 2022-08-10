import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import CommentItem from './CommentItem';
import DetailContext from './DetailContext';

function ReplyList({reply, commentIsopened, setCommentIsopened}) {
  const [replyData, setReplyData] = useState(reply);
  const [writerData, setWriterData] = useState(null);
  const {participants} = useContext(DetailContext);
  useEffect(() => {
    if (participants) {
      setWriterData(
        participants.filter(prev => prev.userId == replyData.writerId),
      );
    }
  }, [participants]);
  return (
    <View style={{marginVertical: '2%'}}>
      <CommentItem
        commentData={replyData}
        setCommentData={setReplyData}
        writerData={writerData}
        commentIsopened={commentIsopened}
        setCommentIsopened={setCommentIsopened}
        isReply={true}></CommentItem>
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo(ReplyList);
