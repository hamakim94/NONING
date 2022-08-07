import React, {useContext, useEffect, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import LogoSearch from '../../components/home/LogoSearch';
import FilterButtonTabs from '../../components/home/FilterButtonTabs';
import Boards from '../../components/home/Boards';
import axios from 'axios';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';
import {useIsFocused} from '@react-navigation/native';
import RecentPopularTabs from '../../components/home/RecentPopularTabs';

// 게시글 가져오기 :  /api/boards/list/{userid}  인풋 : userId, categoryCode, order?categorycode=””
function HomeScreen({navigation}) {
  const [filterName, setFilterName] = useState('전체');
  const [boards, setBoards] = useState([]);
  const [isPopular, setIsPopular] = useState('최신');
  const {userData} = useContext(UserContext);
  const isFocused = useIsFocused();

  const filterToCode = {
    전체: 0,
    연애: 'B0101',
    병맛: 'B0102',
    음식: 'B0103',
    게임: 'B0104',
    운동: 'B0105',
    학교: 'B0106',
    직장: 'B0107',
    갈등: 'B0108',
    기타: 'B0199',
  };
  useEffect(() => {
    UseAxios.get('/boards/list', {
      params: {categorycode: filterToCode[filterName]},
    }).then(res => {
      if (isPopular === '인기순') { // 인기순이니?
        res.data.sort(function (a, b) {
          const participantsA = a.opt1Selected + a.opt2Selected;
          const participantsB = b.opt1Selected + b.opt2Selected;
          if (participantsA > participantsB) return -1;
          if (participantsA === participantsB) return 0;
          if (participantsA < participantsB) return 1;
        });
      } else { // 최신순이니?
        res.data.sort(function (a, b) {
          if (a.boardId > b.boardId) return -1;
          if (a.boardId === b.boardId) return 0;
          if (a.boardId < b.boardId) return 1;
        });
      }
      setBoards(res.data);
    });
  }, [filterName, userData, isFocused, isPopular]);
  // 함수로 뺴놔야 잘 작동 렌더링이 한 번만 일어난다.
  const renderItem = ({item}) => (
    <Boards board={item} navigation={navigation}></Boards>
  );
  const keyExtractor = item => item.boardId;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, padding: 16}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <FilterButtonTabs setFilterName={setFilterName} />
        <RecentPopularTabs setIsPopular ={setIsPopular} ></RecentPopularTabs>
        <FlatList
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          legacyImplementation={true}
          data={boards}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          maxToRenderPerBatch={10}
          disableVirtualization={true}></FlatList>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
