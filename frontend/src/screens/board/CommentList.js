import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

function CommentList({comment, comments, setComments}) {
  const [commentIsopened, setCommentIsopened] = useState(false);

  const likeSubmit = (apiurl, func) => {
    axios({
      url: `http://10.0.2.2:9999/api/boards/${boardid}/comments/${comment.id}/like/{commentLikeCode}`,
      method: 'GET',
      params: {data},
    })
      .then(res => {
        console.log(res);
        alert('확인되었습니다.');
        setCheck(true);
      })
      .catch(err => {
        console.log(err);
        alert('사용 중인 이메일입니다.');
        setCheck(false);
      });
  };
  const likeOnPress = start => {
    setComments(
      comments.map(value =>
        value.id === comment.id ? {...value, like: !value.like} : value,
      ),
    );
  };
  return (
    <View style={{marginVertical: '2%'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity>
            <Avatar
              size={40}
              rounded
              containerStyle={[
                {
                  backgroundColor: 'white',
                  borderWidth: 3,
                },
                {borderColor: comment.writerVote == 1 ? '#FF5A6E' : '#83E3D1'},
              ]}
              source={require('../../assets/ProfileImage.jpg')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 4.5, flexDirection: 'column'}}>
          <View>
            <Text style={{fontSize: 13, color: 'black'}}>
              {comment.nickname}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              {comment.content}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{paddingTop: '1.5%', marginRight: '1%'}}
              onPress={() => likeOnPress()}>
              <Icon name="like2" color="#808080" size={11} />
            </TouchableOpacity>
            <Text style={{fontSize: 12, color: 'black'}}>
              {comment.userLike}
            </Text>
            <TouchableOpacity
              style={{paddingTop: '1.5%', marginRight: '1%', marginLeft: '3%'}}>
              <Icon name="dislike2" color="#808080" size={12} />
            </TouchableOpacity>
            <Text style={{fontSize: 12, color: 'black'}}>
              {comment.userDislike}
            </Text>
            <TouchableOpacity
              style={{marginLeft: '3%'}}
              onPress={() => [setCommentIsopened(prev => !prev)]}>
              <Text
                style={{fontSize: 12, color: '#808080', fontWeight: 'bold'}}>
                {commentIsopened ? '답글 숨기기' : '답글 보기'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" color="black" size={13} />
          </TouchableOpacity>
        </View>
      </View>
      {commentIsopened ? (
        <View>
          <Text>열렸어요</Text>
        </View>
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default React.memo(CommentList);
