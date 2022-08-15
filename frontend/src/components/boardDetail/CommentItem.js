import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import CommentModal from './CommnetModal';
import UseAxios from '../../util/UseAxios';
import DetailContext from './DetailContext';
import CommentContext from './CommentContext';
import {useNavigation} from '@react-navigation/native';

function CommentItem({
  commentData,
  setCommentData,
  writerData,
  commentIsopened,
  setCommentIsopened,
  isReply,
  setNested,
  replys,
  setReplys,
}) {
  const {boardId} = useContext(DetailContext);
  const {setParentComment} = useContext(CommentContext);
  const navigation = useNavigation();
  const likeAxios = (setter, likeCheck) => {
    UseAxios.put(
      `/boards/${boardId}/comments/${commentData.commentId}/${likeCheck}`,
    )
      .then((res) => {
        setter;
      })
      .catch((err) => {
        // console.log(err);
        alert('다시 한번 눌러주세요!');
      });
  };

  const setLikeData = () => {
    setCommentData((commentData) => ({
      ...commentData,
      userLike: !commentData.userLike,
      userDislike: commentData.userDislike
        ? !commentData.userDislike
        : commentData.userDislike,
      likes: commentData.userLike
        ? commentData.likes - 1
        : commentData.likes + 1,
      dislikes: commentData.userDislike
        ? commentData.dislikes - 1
        : commentData.dislikes,
    }));
  };

  const setdisLikeData = () => {
    setCommentData((commentData) => ({
      ...commentData,
      userLike: commentData.userLike
        ? !commentData.userLike
        : commentData.userLike,
      userDislike: !commentData.userDislike,
      likes: commentData.userLike ? commentData.likes - 1 : commentData.likes,
      dislikes: commentData.userDislike
        ? commentData.dislikes - 1
        : commentData.dislikes + 1,
    }));
  };

  const likeOnPress = (start, likeCheck) => {
    switch (likeCheck) {
      case 'like':
        switch (start) {
          case false:
            switch (commentData.userDislike) {
              case false:
                likeAxios(setLikeData(), likeCheck); //중립->좋아요
                break;
              case true:
                likeAxios(setLikeData(), likeCheck); //싫어요->좋아요
                break;
            }
            break;
          case true:
            likeAxios(setLikeData(), likeCheck); //좋아요->좋아요
            break;
        }
        break;
      case 'dislike':
        switch (start) {
          case false:
            switch (commentData.userLike) {
              case false:
                likeAxios(setdisLikeData(), likeCheck); //중립->좋아요
                break;
              case true:
                likeAxios(setdisLikeData(), likeCheck); // 싫어요->좋아요
                break;
            }
            break;
          case true:
            likeAxios(setdisLikeData(), likeCheck); //좋아요->좋아요
            break;
        }
        break;
    }
  };
  const nestOnPress = () => {
    setNested(true);
    setParentComment(commentData.commentId);
  };
  return writerData ? (
    <View style={styles.container}>
      {isReply ? <View style={styles.blankContainer} /> : ''}
      <View style={commentStyles(isReply).firstContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.push('YourPageScreen', {id: commentData.writerId})
          }>
          <Avatar
            size={40}
            rounded
            containerStyle={avaStyles(writerData[0].vote).avartarContainer}
            source={
              writerData[0].img
                ? {uri: writerData[0].img}
                : require('../../assets/DefaultProfile.jpg')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={commentStyles(isReply).secondContainer}>
        <View>
          <Text style={styles.nickNameText}>
            {writerData[0].nickname ? writerData[0].nickname : '탈퇴한논장이'}
          </Text>
        </View>
        <View>
          <Text style={styles.contentText}>{commentData.content}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{paddingTop: '1.5%', marginRight: '1%'}}
            onPress={() => likeOnPress(commentData.userLike, 'like')}>
            {commentData.userLike ? (
              <Icon name="like1" color="#FF5F5F" size={11} />
            ) : (
              <Icon name="like2" color="#808080" size={11} />
            )}
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: '#000000'}}>
            {commentData.likes}
          </Text>
          <TouchableOpacity
            style={{paddingTop: '1.5%', marginRight: '1%', marginLeft: '3%'}}
            onPress={() => likeOnPress(commentData.userDislike, 'dislike')}>
            {commentData.userDislike ? (
              <Icon name="dislike1" color="#49D3CA" size={11} />
            ) : (
              <Icon name="dislike2" color="#808080" size={11} />
            )}
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: '#000000'}}>
            {commentData.dislikes}
          </Text>
          {isReply ? (
            ''
          ) : (
            <>
              <TouchableOpacity
                style={{marginLeft: '3%'}}
                onPress={nestOnPress}>
                <Text
                  style={{fontSize: 12, color: '#808080', fontWeight: 'bold'}}>
                  답글 달기
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: '3%'}}
                onPress={() => setCommentIsopened((prev) => !prev)}>
                <Text
                  style={{fontSize: 12, color: '#808080', fontWeight: 'bold'}}>
                  {commentIsopened ? '답글 숨기기' : '답글 보기'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <View
        style={{flex: 0.5, justifyContent: 'center', alignItems: 'flex-end'}}>
        <CommentModal
          data={commentData}
          replys={replys}
          setReplys={setReplys}></CommentModal>
      </View>
    </View>
  ) : (
    ''
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  blankContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nickNameText: {
    fontSize: 13,
    color: '#000000',
  },
  contentText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
});

const commentStyles = (isReply) =>
  StyleSheet.create({
    firstContainer: {
      flex: isReply ? 0.9 : 1,
      alignItems: 'center',
    },
    secondContainer: {
      flex: isReply ? 3.8 : 4.5,
      flexDirection: 'column',
    },
  });

const avaStyles = (writerVote) =>
  StyleSheet.create({
    avartarContainer: {
      backgroundColor: '#FFFFFF',
      borderWidth: 3,
      borderColor: writerVote == 1 ? '#FF5F5F' : '#49D3CA',
    },
  });

export default React.memo(CommentItem);
