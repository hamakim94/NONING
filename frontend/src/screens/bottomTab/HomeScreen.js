import React, {useEffect, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {View, SafeAreaView, FlatList} from 'react-native';
import LogoSearch from '../../components/home/LogoSearch';
import FilterButtonTabs from '../../components/home/FilterButtonTabs';
import Boards from '../../components/home/Boards';
import axios from 'axios';

// 게시글 가져오기 :  /api/boards/list/{userid}  인풋 : userId, categoryCode, order?categorycode=””
function HomeScreen({navigation}) {
  const [filterName, setFilterName] = useState('전체');
  const [boards, setBoards] = useState([]);
  const [temp_boards, setTempBoards] = useState([]);
  const [start_num, setStartNum] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function get() {
      const {data} = await axios.get( // 처음 실행하는 함수, 전체 보드를 가져온다
        'http://i7a202.p.ssafy.io:9999/api/boards/list',
        {
          params: {categorycode: 0},
        },
      ); //이렇게 요청하면, 매번 url에 새로운 객체 주소를 받아오기 떄문에, 계속 무한
      setBoards(data);
    }
    get();
  }, []);

  // 전체 가져온 데이터를 10개보다 작으면 그 개수만큼, 아니면 10개씩 복사
  const getData = start => {
    if (boards.length > start + 10) {
      setLoading(true);
      setTempBoards(temp_boards.concat([...boards].slice(start, start + 10)));
      setStartNum(start_num + 10);
      setLoading(false);
    } else if (boards.length > start) {
      setLoading(true);
      setTempBoards(temp_boards.concat([...boards]));
      setStartNum(start_num + boards.length);
      setLoading(false);
    }
  };
  // 처음 렌더링 될 떄 , 10개 이하만 가져오기
  if (temp_boards.length === 0) {
    getData(0);
  }
 
  const onEndReached = () => { // 끝을 만나면. 
    if (loading) {             // 로딩 중이면 그만하고, 로딩중이 아니라면 getData 하렴!
      return;
    } else {                   // 아니면 그만
      getData(start_num);
    }
  };
  // 함수로 뺴놔야 잘 작동 렌더링이 한 번만 일어난다.
  const renderItem = ({item}) => (
    <Boards
      board={item}
      boards={temp_boards}
      setBoards={setTempBoards}
      navigation={navigation}></Boards>
  );
  const keyExtractor = item => item.boardId;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <Divider width={0.5}></Divider>
        <FilterButtonTabs
          setFilterName={setFilterName}
        />
        <Divider width={0.5}></Divider>
        <FlatList
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          legacyImplementation={true}
          data={temp_boards}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          onEndReachedThreshold={1}
          disableVirtualization={false}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color="#00ff00" />
          }></FlatList>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
