import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Flows from '../../components/flow/Flows';
import UseAxios from '../../util/UseAxios';

const windowHeight = Dimensions.get('window').height * 0.934;

function FlowScreen({navigation}) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    UseAxios.get('/boards/flow').then(res => {
      setBoards(res.data);
    });
  }, []);

  const renderItem = ({item}) => (
    <Flows board={item} navigation={navigation}></Flows>
  );

  const memoizedItem = useMemo(() => renderItem, [boards]);

  const keyExtractor = useCallback(item => item.boardId, []);

  const snapToOffsets = useMemo(
    () =>
      Array.from(Array(boards.length)).map((_, index) => index * windowHeight),
    [boards],
  );
  return (
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
