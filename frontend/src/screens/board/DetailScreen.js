import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import CommentScreen from './CommentScreen';
import AnalysisScreen from './AnalysisScreen';
import {useIsFocused} from '@react-navigation/native';
import DetailContext from '../../components/boardDetail/DetailContext';
import UserContext from '../../util/UserContext';
import BoardBar from '../../components/home/BoardBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UseAxios from '../../util/UseAxios';
import {Avatar} from '@rneui/themed';
import BoardModal from '../../components/boardDetail/BoardModal';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#FF5A6E',
      width: '20%',
      marginHorizontal: '9.5%',
    }}
    tabStyle={{justifyContent: 'center'}}
    pressColor={'transparent'}
    style={{
      backgroundColor: '#FFFFFF',
      shadowColor: '#FFFFFF',
      borderBottomWidth: 0.5,
      borderBottomColor: '#A6A6A6',
      borderTopWidth: 0.5,
      borderTopColor: '#A6A6A6',
    }}
    renderLabel={({route, focused}) => (
      <Text
        style={
          focused
            ? {
                color: '#FF5A6E',
                margin: 0,
                padding: 0,
                fontWeight: 'bold',
                fontSize: 15,
                width: '110%',
              }
            : {margin: 0, padding: 0, color: '#808080', fontSize: 15}
        }>
        {route.title}
      </Text>
    )}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

export default function DetailScreen({navigation, route}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 0, title: '댓글'},
    {key: 1, title: '분석'},
  ]);
  const [participants, setParticipants] = useState(null);
  const [board, setBoard] = useState(null);
  const {userData} = useContext(UserContext);
  const boardId = route.params.boardId;
  const isFocused = useIsFocused();
  const renderScene = ({route}) => {
    switch (route.key) {
      case 0:
        return <CommentScreen board={board} />;
      case 1:
        return <AnalysisScreen board={board} />;
    }
  };
  useEffect(() => {
    if (isFocused) {
      UseAxios.get(`/boards/${boardId}`)
        .then((res) => {
          console.log(res.data);
          setBoard(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      UseAxios.get(`/boards/${boardId}/users`)
        .then((res) => {
          setParticipants(res.data);
        })
        .catch((err) => {});
    }
  }, [isFocused]);

  const like = () => {
    UseAxios.post(`/boards/${board.boardId}/like`, null, {
      params: {
        userId: userData.userId,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlike = () => {
    UseAxios.delete(`/boards/${board.boardId}/unlike?userId=${userData.userId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleLike = () => {
    setBoard({...board, userLike: !board.userLike});
  };

  const betray = () => {
    UseAxios.put(`/boards/${board.boardId}/betray`, {
      userId: userData.userId,
      vote: board.userVote == 1 ? 2 : 1,
    })
      .then((res) => {
        setBoard({
          ...board,
          opt1Selected: res.data.opt1,
          opt2Selected: res.data.opt2,
          userVote: board.userVote == 1 ? 2 : 1,
        });
        setParticipants(
          participants.map((user) =>
            user.userId === userData.userId
              ? {...user, vote: user.vote == 1 ? 2 : 1}
              : user,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onLive = () => {
    if (board.live) {
      navigation.navigate('ChatNav', {
        screen: 'ChatInfoScreen',
        params: {id: board.boardId},
      });
    } else
      navigation.navigate('ChatNav', {
        screen: 'ChatScreen',
        params: {data: board},
      });
  };
  return (
    <DetailContext.Provider
      value={{
        boardId,
        participants,
        setParticipants,
      }}>
      <View style={styles.container}>
        <View
          style={{
            flex: 2.4,
            alignItems: 'center',
            paddingTop: 16,
            paddingHorizontal: 16,
          }}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{board ? board.title : ''}</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              height: 65,
              justifyContent: 'center',
            }}>
            {board ? (
              <BoardBar
                board={board}
                setBoards={setBoard}
                navigation={navigation}></BoardBar>
            ) : (
              ''
            )}
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              paddingRight: 10,
              marginTop: 3,
            }}>
            <Text style={{textAlign: 'right', color: '#000000'}}>
              참여 {participants ? participants.length : ''}명{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                userData === null
                  ? navigation.navigate('LoginNav', {screen: 'LoginNav'})
                  : [toggleLike(), board.userLike ? unlike() : like()];
              }}>
              <AntDesign
                style={board ? styles.iconColor(board.userLike) : ''}
                name="heart"
                size={20}
              />
            </TouchableOpacity>
          </View>
          {board ? (
            board.userVote == 0 ? (
              ''
            ) : (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                onPress={betray}>
                <Text
                  style={{
                    color: '#000000',
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    marginVertical: 2,
                  }}>
                  배신하기
                </Text>
              </TouchableOpacity>
            )
          ) : (
            ''
          )}
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <TouchableOpacity
                disabled={board ? (board.writerNickname ? false : true) : true}
                onPress={() =>
                  navigation.push('YourPageScreen', {id: board.writerId})
                }>
                <View style={{flexDirection: 'row'}}>
                  <Avatar
                    size={19}
                    rounded
                    containerStyle={styles.avartarContainer}
                    source={
                      board
                        ? board.writerImg
                          ? {uri: board.writerImg}
                          : require('../../assets/DefaultProfile.jpg')
                        : ''
                    }
                  />
                  <Text style={{color: '#000000'}}>
                    {board
                      ? board.writerNickname
                        ? board.writerNickname
                        : '탈퇴한논장이'
                      : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {board ? (
                board.userVote == 0 ? (
                  ''
                ) : (
                  <TouchableOpacity onPress={onLive}>
                    <Text style={styles.liveButton(board ? board.live : '')}>
                      LIVE
                    </Text>
                  </TouchableOpacity>
                )
              ) : (
                ''
              )}
              {board ? (
                <BoardModal data={board} navigation={navigation}></BoardModal>
              ) : (
                ''
              )}
            </View>
          </View>
        </View>
        <View style={{flex: 3.3, marginTop: '1%'}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </DetailContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleContainer: {
    height: 90,
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveButton: (live) => ({
    width: 40,
    borderColor: live ? '#FF5F5F' : '#808080',
    borderRadius: 5,
    color: live ? '#FF5F5F' : '#808080',
    borderWidth: live ? 2 : 1,
    fontWeight: 'bold',
    fontSize: 12,
    margin: 2,
    marginRight: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
  iconColor: (userLike) => ({
    color: userLike ? '#FF5F5F' : '#A6A6A6',
  }),
  avartarContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
});
