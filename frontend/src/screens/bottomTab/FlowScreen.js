import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { TouchableOpacity, StyleSheet, View, SafeAreaView, FlatList, Dimensions } from 'react-native';
import Flows from '../../components/flow/Flows'
import {BOARDS} from '../../data/boards';

// 게시글 가져오기 :  /api/boards/list/{userid}  인풋 : userId, categoryCode, order?categorycode=””
function FlowScreen({navigation}) {

  const [boards, setBoards] = useState([]);
  const [temp_boards, setTempBoards] = useState([])
  const [start_num, setStartNum] = useState(0);
  const [loading, setLoading] = useState(false);
  // 처음 실행하는 함수, 전체 보드 를 가져오는데, 이를 먼저 수정해
  // useEffect(() => {
  //   (async () => {
  //     // const {data} = await axios.get("님들 서버 URL");s
  //     setBoards(BOARDS);
  //   })();
  // }, []);

  useEffect(() => {
    UseAxios.get('/boards/flow').then(res => {
      setBoards(res.data)
    })
  }, []);


  // 전체 가져온 데이터를 복사하는 함수.
  const getData = async (start) => {
    if(start + 10 < boards.length ){
      console.log('복사 시작..')
      setLoading(true)
      setTempBoards(temp_boards.concat([...boards].slice(start, start+10)));
      setStartNum(start_num+10) ;
      setLoading(false)
    }
  };
  // 처음 렌더링 될 떄 , 10개만 가져오기s
  if(temp_boards.length === 0){
    getData(0)
  }
  // 끝을 만나면.
  const onEndReached = () => {
    // 로딩 중이면 그만하고, 로딩중이 아니라면 getData 하렴!
    if (loading) {
      return;
    } else {
      getData(start_num);
    }
  }
  const renderItem = useCallback(
    ({item}) => <Flows board={item} boards={temp_boards} setBoards={setTempBoards} navigation={navigation}></Flows>,
    []
  );
  const keyExtractor = useCallback((item) => item.board_id, []);

  return (
      <View style={{flex: 1, margin: 0}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          legacyImplementation={true}
          data={temp_boards}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached = {onEndReached}
          onEndReachedThreshold={1}
          disableVirtualization={false} 
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#00ff00"/>}
          >
        </FlatList>
      </View>
  );
}
const styles = StyleSheet.create({
});
export default FlowScreen;
