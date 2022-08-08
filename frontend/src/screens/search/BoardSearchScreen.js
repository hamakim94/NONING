import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import UseAxios from '../../util/UseAxios';

const Tab = createMaterialTopTabNavigator();

function BoardSearchScreen(item, setItem, navigation) {
  const [boards, setBoards] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    UseAxios.get('/boards/list', {
      params: {categorycode: 0},
    }).then(res => {
      setBoards(res.data);
      setfilterdData(res.data);
    });
  }, []);

  const searchFilter = text => {
    if (text) {
      const newData = boards.filter(item => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(boards);
      setSearch(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}></View>
    );
  };

  const ItemView = ({item}) => {
    return (
      <View>
        {item ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HomeDetail', {boardId: item.boardId})
            }>
            <View style={{height: 75, justifyContent: 'center'}}>
              <Text style={styles.itemStyle}>{item.title.toUpperCase()}</Text>
              <View style={{flexDirection: 'row'}}>
                {(() => {
                  if (item.userVote === 1)
                    return (
                      <AntDesign
                        name={'checkcircleo'}
                        size={15}
                        color={'red'}
                        style={styles.optionIcon}
                      />
                    );
                  else if (item.userVote === 2)
                    return (
                      <AntDesign
                        name={'checkcircleo'}
                        size={15}
                        color={'blue'}
                        style={styles.optionIcon}
                      />
                    );
                  else return;
                })()}
                {(() => {
                  if (item.userVote == '1') return <Text>{item.opt1}</Text>;
                  else if (item.userVote == '2')
                    return <Text>{item.opt2}</Text>;
                  else return;
                })()}
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={StyleSheet.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="논쟁 제목을 검색해 보세요."
          underlineColorAndroid="transparent"
          onChangeText={text => searchFilter(text)}></TextInput>
        <FlatList
          data={filterdData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemStyle: {
    paddingTop: '3%',
    marginLeft: '3.5%',
    paddingBottom: '1.5%',
    fontWeight: 'bold',
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  optionIcon: {
    marginLeft: '3.5%',
    marginRight: '1%',
    paddingTop: '0.5%',
    marginBottom: '3%',
  },
});
export default BoardSearchScreen;
