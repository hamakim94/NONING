import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, FlatList, Dimensions, Text, TouchableOpacity} from 'react-native';
import Flows from '../../components/flow/Flows';
import UseAxios from '../../util/UseAxios';
import {useIsFocused} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height * 0.934;

function FlowScreen({navigation}) {
  const [boards, setBoards] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    UseAxios.get('/boards/flow').then((res) => {
      res.data.sort(function (a, b) {
        if (a.boardId > b.boardId) return -1;
        if (a.boardId === b.boardId) return 0;
        if (a.boardId < b.boardId) return 1;
      });
      setBoards(res.data);
    });
  }, [isFocused]);

  const renderItem = ({item}) => (
    <Flows board={item} navigation={navigation}></Flows>
  );

  const memoizedItem = useMemo(() => renderItem, [boards]);

  const keyExtractor = useCallback((item) => item.boardId, []);

  const snapToOffsets = useMemo(
    () =>
      Array.from(Array(boards.length)).map((_, index) => index * windowHeight),
    [boards],
  );
  return boards.length === 0 ? (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <Text>투표가 모두 완료됐어용 나중에 꾸밀게용</Text>
      <TouchableOpacity onPress={() => navigation.navigate('PlusScreen')}>
        <Text> 글쓰러가기</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        legacyImplementation={true}
        maxToRenderPerBatch={1}
        initialNumToRender={1}
        windowSize={2}
        data={boards}
        renderItem={memoizedItem}
        keyExtractor={keyExtractor}
        snapToOffsets={snapToOffsets}
        disableIntervalMomentum={true}></FlatList>
    </View>
  );
}
export default FlowScreen;
