import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Avatar} from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default function CommentList({comment}) {
  const [useComment, setUseComment] = useState(comment);
  const [commentIsopened, setCommentIsopened] = useState('false');
  console.log(commentIsopened);
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
              {useComment.nickname}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              {useComment.content}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{paddingTop: '1.5%', marginRight: '1%'}}>
              <Icon name="like2" color="black" size={13} />
            </TouchableOpacity>
            <Text style={{fontSize: 13, color: 'black'}}>
              {useComment.userLike}
            </Text>
            <TouchableOpacity
              style={{paddingTop: '1.5%', marginRight: '1%', marginLeft: '3%'}}>
              <Icon name="dislike2" color="black" size={13} />
            </TouchableOpacity>
            <Text style={{fontSize: 13, color: 'black'}}>
              {useComment.userDislike}
            </Text>
            <TouchableOpacity
              style={{marginLeft: '3%'}}
              onPress={() => setCommentIsopened(!commentIsopened)}>
              <Text
                style={{fontSize: 13, color: '#808080', fontWeight: 'bold'}}>
                {commentIsopened ? '답글 보기' : '답글 숨기기'}
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
        ''
      ) : (
        <View>
          <Text>열렸어요</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
