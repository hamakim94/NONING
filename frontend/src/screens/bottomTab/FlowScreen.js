import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Flows from '../../components/flow/Flows';
import UseAxios from '../../util/UseAxios';
import {useIsFocused} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

function FlowScreen({navigation}) {
  const [boards, setBoards] = useState([]);
  const isFocused = useIsFocused();
  const [empty, setEmpty] = useState(false);
  const realHeight = Dimensions.get('window').height - useBottomTabBarHeight();
  useEffect(() => {
    UseAxios.get('/boards/flow').then((res) => {
      res.data.sort(function (a, b) {
        if (a.boardId > b.boardId) return -1;
        if (a.boardId === b.boardId) return 0;
        if (a.boardId < b.boardId) return 1;
      });
      setBoards(res.data);
      if (res.data.length === 0) {
        setEmpty(true);
      }
    });
  }, [isFocused]);

  const renderItem = ({item}) => (
    <Flows board={item} navigation={navigation}></Flows>
  );

  const memoizedItem = useMemo(() => renderItem, [boards]);

  const keyExtractor = useCallback((item) => item.boardId, []);

  const snapToOffsets = useMemo(
    () =>
      Array.from(Array(boards.length)).map((_, index) => index * realHeight),
    [boards],
  );

  return !empty ? (
    <View style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        legacyImplementation={true}
        maxToRenderPerBatch={3}
        initialNumToRender={3}
        windowSize={2}
        data={boards}
        renderItem={memoizedItem}
        keyExtractor={keyExtractor}
        snapToOffsets={snapToOffsets}
        disableIntervalMomentum={true}></FlatList>
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 0.6, justifyContent: 'center'}}>
        <Image
          style={{height: 105, width: 135, alignSelf: 'center'}}
          source={require('../../components/common/header-logo.png')}></Image>
      </View>
      <View styel={{flex: 1.2}}>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 15,
          }}>
          텅~ 더 이상 투표할 논쟁이 없어요
        </Text>
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FF5F5F',
              width: 200,
              padding: 10,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            onPress={() => navigation.navigate('PlusScreen')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: 15,
                justifyContent: 'center',
              }}>
              새로운 논쟁 만들기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default FlowScreen;
