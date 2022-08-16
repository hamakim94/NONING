import React, {useContext, useEffect, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {
  View,
  SafeAreaView,
  FlatList,
  BackHandler,
  ToastAndroid,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
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
  const {userData} = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
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
    if (isFocused) {
      let exitApp = false;
      const backAction = () => {
        if (!exitApp) {
          ToastAndroid.show(
            "'뒤로' 버튼을 한번 더 누르시면 종료됩니다.",
            ToastAndroid.SHORT,
          );
          exitApp = true;
          setTimeout(() => {
            exitApp = false;
          }, 2000);
        } else {
          BackHandler.exitApp();
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [isFocused]);

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
        if (res.data.length == 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
        setBoards(res.data);
        setRefreshing(false);
      })
      .catch((err) => setRefreshing(false));
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <LogoSearch navigation={navigation}></LogoSearch>
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <FilterButtonTabs setFilterName={setFilterName} />
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <RecentPopularTabs setIsPopular={setIsPopular}></RecentPopularTabs>
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          {!isEmpty ? (
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
          ) : (
            <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
              <View style={{flex: 0.6, justifyContent: 'center'}}>
                <Image
                  style={{height: 105, width: 135, alignSelf: 'center'}}
                  source={require('../../components/common/header-logo.png')}></Image>
              </View>
              <View>
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
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
export default HomeScreen;
