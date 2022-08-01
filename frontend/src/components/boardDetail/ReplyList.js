import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CommentItem from './CommentItem';

function ReplyList({reply, commentIsopened, setCommentIsopened}) {
  const [replyData, setReplyData] = useState(reply);

  return (
    <View style={{marginVertical: '2%'}}>
      <CommentItem
        commentData={replyData}
        setCommentData={setReplyData}
        commentIsopened={commentIsopened}
        setCommentIsopened={setCommentIsopened}
        isReply={true}></CommentItem>
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo(ReplyList);
