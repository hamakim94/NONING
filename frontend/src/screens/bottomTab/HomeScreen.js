import React, {useContext, useEffect, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {View, SafeAreaView, FlatList, Dimensions} from 'react-native';
import LogoSearch from '../../components/home/LogoSearch';
import FilterButtonTabs from '../../components/home/FilterButtonTabs';
import Boards from '../../components/home/Boards';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';
import RecentPopularTabs from '../../components/home/RecentPopularTabs';
import {useIsFocused} from '@react-navigation/native';

// 게시글 가져오기 :  /api/boards/list/{userid}  인풋 : userId, categoryCode, order?categorycode=””
function HomeScreen({navigation}) {
  const [filterName, setFilterName] = useState('전체');
  const [boards, setBoards] = useState([]);
  const [isPopular, setIsPopular] = useState('최신');
  const {userData, realHeight, setRealHeight} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
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

  const getData = () => {
    setRefreshing(true);
    UseAxios.get('/boards/list', {
      params: {categorycode: filterToCode[filterName]},
    })
      .then((res) => {
        if (isPopular === '인기순') {
          // 인기순이니?
          res.data.sort(function (a, b) {
            const participantsA = a.opt1Selected + a.opt2Selected;
            const participantsB = b.opt1Selected + b.opt2Selected;
            if (participantsA > participantsB) return -1;
            if (participantsA === participantsB) return 0;
            if (participantsA < participantsB) return 1;
          });
        } else {
          // 최신순이니?
          res.data.sort(function (a, b) {
            if (a.boardId > b.boardId) return -1;
            if (a.boardId === b.boardId) return 0;
            if (a.boardId < b.boardId) return 1;
          });
        }
        setBoards(res.data);
      })
      .then(() => setRefreshing(false));
  };
  const onRefresh = () => {
    if (!refreshing) {
      getData();
    }
  };
  useEffect(() => getData(), [filterName, userData, isPopular, isFocused]);
  // 함수로 뺴놔야 잘 작동 렌더링이 한 번만 일어난다.
  const renderItem = ({item}) => (
    <Boards board={item} navigation={navigation}></Boards>
  );
  const keyExtractor = (item) => item.boardId;
  const onLayout = (event) => {
    const {height} = event.nativeEvent.layout;
    setRealHeight(height);
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#FFFFFF'}}
      onLayout={onLayout}>
      <View style={{flex: 1}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <FilterButtonTabs setFilterName={setFilterName} />
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <RecentPopularTabs setIsPopular={setIsPopular}></RecentPopularTabs>
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            legacyImplementation={true}
            data={boards}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            disableVirtualization={true}
            onRefresh={onRefresh}
            refreshing={refreshing}></FlatList>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
