import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CommentItem from './CommentItem';
import ReplyTestData from './ReplyTestData';
import ReplyList from './ReplyList';

function CommentList({comment, participants}) {
  const [commentIsopened, setCommentIsopened] = useState(false);
  const [commentData, setCommentData] = useState(comment);
  const [replys, setReplys] = useState([]);
  const [writerData, setWriterData] = useState(null);
  useEffect(() => {
    if (participants) {
      setWriterData(
        participants.filter(prev => prev.userId == commentData.writerId),
      );
    }
  }, [participants]);

  const renderItem = ({item}) => (
    <ReplyList
      reply={item}
      commentIsopened={commentIsopened}
      setCommentIsopened={setCommentIsopened}
    />
  );

  return (
    <View style={{marginVertical: '2%'}}>
      <CommentItem
        commentData={commentData}
        setCommentData={setCommentData}
        writerData={writerData}
        commentIsopened={commentIsopened}
        setCommentIsopened={setCommentIsopened}
        isReply={false}></CommentItem>
      {commentIsopened ? (
        <View style={{marginTop: '2%'}}>
          <FlatList
            data={replys}
            renderItem={renderItem}
            keyExtractor={reply => reply.id}
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
