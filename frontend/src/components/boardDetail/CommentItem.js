import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import CommentModal from './CommnetModal';
import axios from 'axios';

function CommentItem({
  commentData,
  setCommentData,
  commentIsopened,
  setCommentIsopened,
  isReply,
}) {
  const likeAxios = (code, setter, likeCheck) => {
    axios({
      url: `http://i7a202.p.ssafy.io:9999/api/boards/${boardid}/comments/${commentData.id}/${likeCheck}/${code}`,
      method: 'PUT',
    })
      .then(res => {
        console.log(res);
        alert('성공');
        setter;
      })
      .catch(err => {
        console.log(err);
        alert('실패');
      });
  };

  const setLikeData = () => {
    setCommentData(commentData => ({
      ...commentData,
      like: !commentData.like,
      dislike: commentData.dislike ? !commentData.dislike : commentData.dislike,
      userLike: commentData.like
        ? commentData.userLike - 1
        : commentData.userLike + 1,
      userDislike: commentData.dislike
        ? commentData.userDislike - 1
        : commentData.userDislike,
    }));
  };

  const setdisLikeData = () => {
    setCommentData(commentData => ({
      ...commentData,
      like: commentData.like ? !commentData.like : commentData.like,
      dislike: !commentData.dislike,
      userLike: commentData.like
        ? commentData.userLike - 1
        : commentData.userLike,
      userDislike: commentData.dislike
        ? commentData.userDislike - 1
        : commentData.userDislike + 1,
    }));
  };

  const likeOnPress = (start, likeCheck) => {
    switch (likeCheck) {
      case 'like':
        switch (start) {
          case false:
            switch (commentData.dislike) {
              case false:
                setLikeData();
                // likeAxios(0, setLikeData, likeCheck); 중립->좋아요
                console.log(0);
                console.log(commentData);
                break;
              case true:
                setLikeData();
                // likeAxios(1, setLikeData, likeCheck); 싫어요->좋아요
                console.log(1);
                console.log(commentData);
                break;
            }
            break;
          case true:
            setLikeData();
            // likeAxios(2, setLikeData); 좋아요->좋아요
            console.log(2);
            console.log(commentData);
            break;
        }
        break;
      case 'dislike':
        switch (start) {
          case false:
            switch (commentData.like) {
              case false:
                setdisLikeData();
                // likeAxios(0, setLikeData, likeCheck); 중립->좋아요
                console.log(0);
                console.log(commentData);
                break;
              case true:
                setdisLikeData();
                // likeAxios(1, setLikeData, likeCheck); 싫어요->좋아요
                console.log(1);
                console.log(commentData);
                break;
            }
            break;
          case true:
            setdisLikeData();
            // likeAxios(2, setLikeData); 좋아요->좋아요
            console.log(2);
            console.log(commentData);
            break;
        }
        break;
    }
  };
  return (
    <View style={styles.container}>
      {isReply ? <View style={styles.blankContainer} /> : ''}
      <View style={commentStyles(isReply).firstContainer}>
        <TouchableOpacity>
          <Avatar
            size={40}
            rounded
            containerStyle={avaStyles(commentData.writerVote).avartarContainer}
            source={require('../../assets/ProfileImage.jpg')}
          />
        </TouchableOpacity>
      </View>
      <View style={commentStyles(isReply).secondContainer}>
        <View>
          <Text style={styles.nickNameText}>{commentData.nickname}</Text>
        </View>
        <View>
          <Text style={styles.contentText}>{commentData.content}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{paddingTop: '1.5%', marginRight: '1%'}}
            onPress={() => likeOnPress(commentData.like, 'like')}>
            {commentData.like ? (
              <Icon name="like1" color="#FF5F5F" size={11} />
            ) : (
              <Icon name="like2" color="#808080" size={11} />
            )}
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: '#000000'}}>
            {commentData.userLike}
          </Text>
          <TouchableOpacity
            style={{paddingTop: '1.5%', marginRight: '1%', marginLeft: '3%'}}
            onPress={() => likeOnPress(commentData.dislike, 'dislike')}>
            {commentData.dislike ? (
              <Icon name="dislike1" color="#49D3CA" size={11} />
            ) : (
              <Icon name="dislike2" color="#808080" size={11} />
            )}
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: '#000000'}}>
            {commentData.userDislike}
          </Text>
          {isReply ? (
            ''
          ) : (
            <TouchableOpacity
              style={{marginLeft: '3%'}}
              onPress={() => setCommentIsopened(prev => !prev)}>
              <Text
                style={{fontSize: 12, color: '#808080', fontWeight: 'bold'}}>
                {commentIsopened ? '답글 숨기기' : '답글 보기'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <CommentModal></CommentModal>
      </View>
    </View>
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

const commentStyles = isReply =>
  StyleSheet.create({
    firstContainer: {
      flex: isReply ? 0.9 : 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondContainer: {
      flex: isReply ? 3.8 : 4.5,
      flexDirection: 'column',
    },
  });

const avaStyles = writerVote =>
  StyleSheet.create({
    avartarContainer: {
      backgroundColor: '#FFFFFF',
      borderWidth: 3,
      borderColor: writerVote == 1 ? '#FF5F5F' : '#49D3CA',
    },
  });

export default React.memo(CommentItem);
