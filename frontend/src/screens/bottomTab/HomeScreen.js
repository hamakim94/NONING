import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import LogoSearch from '../../components/home/LogoSearch';
import FilterButtonTabs from '../../components/home/FilterButtonTabs';
import Boards from '../../components/home/Boards';
import {BOARDS} from '../../data/boards';
import axios from 'axios';

// 게시글 가져오기 :  /api/boards/list/{userid}  인풋 : userId, categoryCode, order?categorycode=””
function HomeScreen({navigation}) {
  const [filterName, setFilterName] = useState('전체');
  const [boards, setBoards] = useState([]);
  const [temp_boards, setTempBoards] = useState([])
  const [start_num, setStartNum] = useState(0);
  const [loading, setLoading] = useState(false);
  // 처음 실행하는 함수, 전체 보드 를 가져오는데, 이를 먼저 수정해
  useEffect(() => {
    (async () => {
      // const {data} = await axios.get("님들 서버 URL");s
      setBoards(BOARDS);
    })();
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
    ({item}) => <Boards board={item} boards={temp_boards} setBoards={setTempBoards} navigation={navigation}></Boards>,
    []
  );
  const keyExtractor = useCallback((item) => item.board_id, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <Divider width={0.5}></Divider>
        <FilterButtonTabs filterName = {filterName} setFilterName={setFilterName} />
        <Divider width={0.5}></Divider>
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 30,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  scrollContainer: {
    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: 30,
      marginBottom: 5,
    },
  },
  textFocused: {
    color: '#FF7171',
  },
  textNotFocused: {},
});
export default HomeScreen;
