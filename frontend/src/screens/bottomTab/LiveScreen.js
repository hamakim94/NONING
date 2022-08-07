import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {Divider} from '@rneui/base/dist/Divider';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import LiveFilterButtonTabs from '../../components/live/LiveFilterButtonTabs';
import Lives from '../../components/live/Lives';
import LiveLogoSearch from '../../components/live/LiveLogoSearch';
import UseAxios from '../../util/UseAxios';

import UserContext from '../../util/UserContext';

function LiveScreen({navigation}) {
  const {userData} = useContext(UserContext);
  const [filterName, setFilterName] = useState('전체');
  const [lives, setLives] = useState([]);
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
      setLives(res.data);
    });
  }, [filterName, userData]);

  const renderItem = ({item}) => (
    <Lives live={item} navigation={navigation}></Lives>
  );

  const memoizedItem = useMemo(() => renderItem, [lives]);

  const keyExtractor = useCallback(item => item.boardId, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{flex: 1, padding: 16}}>
        <LiveLogoSearch navigation={navigation}></LiveLogoSearch>
        <Divider width={0.5}></Divider>
        <LiveFilterButtonTabs setFilterName={setFilterName} />
        <Divider width={0.5}></Divider>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={lives}
          renderItem={memoizedItem}
          keyExtractor={keyExtractor}></FlatList>
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
export default LiveScreen;
