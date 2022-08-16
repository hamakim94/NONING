import React, {useContext, useEffect, useState} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {View, SafeAreaView, FlatList, Text, Image} from 'react-native';
import LiveFilterButtonTabs from '../../components/live/LiveFilterButtonTabs';
import Lives from '../../components/live/Lives';
import LiveLogoSearch from '../../components/live/LiveLogoSearch';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';
import LiveRecentPopularTabs from '../../components/live/LiveRecentPopularTabs';
import {useIsFocused} from '@react-navigation/native';

function LiveScreen({navigation}) {
  const {userData} = useContext(UserContext);
  const [filterName, setFilterName] = useState('전체');
  const [isPopular, setIsPopular] = useState('최신');
  const [lives, setLives] = useState([]);
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

  const getData = () => {
    setRefreshing(true);
    UseAxios.get('/lives/list', {
      params: {categorycode: filterToCode[filterName]},
    })
      .then((res) => {
        // const result = res.data.filter((board) => board.live);
        if (isPopular === '인기순') {
          res.data.sort(function (a, b) {
            const participantsA = a.liveOpt1Selected + a.liveOpt2Selected;
            const participantsB = b.liveOpt1Selected + b.liveOpt2Selected;
            if (participantsA > participantsB) return -1;
            if (participantsA === participantsB) return 0;
            if (participantsA < participantsB) return 1;
          });
        } else {
          res.data.sort(function (a, b) {
            if (a.liveId > b.liveId) return -1;
            if (a.liveId === b.liveId) return 0;
            if (a.liveId < b.liveId) return 1;
          });
        }
        if (res.data.length == 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
        setLives(res.data);
      })
      .then(() => setRefreshing(false));
  };
  const onRefresh = () => {
    if (!refreshing) {
      getData();
    }
  };

  useEffect(() => getData(), [filterName, userData, isPopular, isFocused]);

  const renderItem = ({item}) => (
    <Lives live={item} navigation={navigation}></Lives>
  );
  const keyExtractor = (item) => item.boardId;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1}}>
        <LiveLogoSearch></LiveLogoSearch>
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <LiveFilterButtonTabs setFilterName={setFilterName} />
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <LiveRecentPopularTabs
          setIsPopular={setIsPopular}></LiveRecentPopularTabs>
        <Divider width={0.5} color={'#A6A6A6'}></Divider>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          {!isEmpty ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              legacyImplementation={true}
              data={lives}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
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
              <View styel={{flex: 1.2}}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000000',
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginBottom: 15,
                  }}>
                  텅~ 실시간으로 진행중인 논쟁이 없어요
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LiveScreen;
