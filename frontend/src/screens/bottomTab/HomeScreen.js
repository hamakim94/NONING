import React, {useEffect, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {View, SafeAreaView, FlatList} from 'react-native';
import LogoSearch from '../../components/home/LogoSearch';
import FilterButtonTabs from '../../components/home/FilterButtonTabs';
import Boards from '../../components/home/Boards';
import axios from 'axios';
import { BOARDS } from '../../data/boards';

// 게시글 가져오기 :  /api/boards/list/{userid}  인풋 : userId, categoryCode, order?categorycode=””
function HomeScreen({navigation}) {
  const [filterName, setFilterName] = useState('전체');
  const [boards, setBoards] = useState([]);
  const [temp_boards, setTempBoards] = useState([]);
  const [start_num, setStartNum] = useState(0);
  const [loading, setLoading] = useState(false);

  const filterToCode = {
    '전체' : 0,
    '연애' : 'B0101',
    '병맛' : 'B0102',
    '음식' : 'B0103',
    '게임' : 'B0104',
    '운동' : 'B0105',
    '학교' : 'B0106',
    '직장' : 'B0107',
    '갈등' : 'B0108',
    '기타' : 'B0199',
  } 
  useEffect(() => {
    async function get(categoryCode) {
      // const {data} = await axios.get( // 처음 실행하는 함수, 전체 보드를 가져온다
      //   'http://i7a202.p.ssafy.io:9999/api/boards/list',
      //   {
      //     params: {categorycode: filterToCode[filterName]},
      //   },
      // ); //이렇게 요청하면, 매번 url에 새로운 객체 주소를 받아오기 떄문에, 계속 무한
      // setBoards(data);
      // console.log(data)
      //----------------------------------삭제-----------------------
      const temp = [...BOARDS].filter(board => board.categoryCode === categoryCode)
      console.log(temp);
      setBoards(temp)
      console.log(categoryCode);
      //----------------------------------삭제-----------------------
    }
    get(filterToCode[filterName]);
    // console.log(1 + ' useEffect')
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
    
  }, [filterName]);

  // 여기서 board가 바뀌면 temp_board 복사를 딱 해야해!

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
  
  // // 처음 렌더링 될 떄 , 10개 이하만 가져오기
  // if (temp_boards.length === 0) {
  //   getData(0);
  // }
 
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
