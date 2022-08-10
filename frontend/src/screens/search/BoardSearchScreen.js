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
import UseAxios from '../../util/UseAxios';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Divider} from '@rneui/themed';

const Tab = createMaterialTopTabNavigator();

function BoardSearchScreen({navigation}) {
  const [boards, setBoards] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    UseAxios.get('/boards/list', {
      params: {categorycode: 0},
    }).then((res) => {
      setBoards(res.data);
      setfilterdData(res.data);
    });
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = boards.filter((item) => {
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
        style={{height: 0.5, width: '100%', backgroundColor: '#FFFFFF'}}></View>
    );
  };

  const ItemView = ({item}) => {
    return (
      <View>
        {item ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailScreen', {boardId: item.boardId})
            }>
            <View style={{height: 65, justifyContent: 'center'}}>
              <Text style={styles.itemStyle}>{item.title.toUpperCase()}</Text>
              <View style={{flexDirection: 'row'}}>
                {(() => {
                  if (item.userVote === 1)
                    return (
                      <EvilIcons
                        name={'sc-instagram'}
                        size={15}
                        color={'rgba(255,95,95,1)'}
                        style={styles.optionIcon}
                      />
                    );
                  else if (item.userVote === 2)
                    return (
                      <EvilIcons
                        name={'sc-instagram'}
                        size={15}
                        color={'rgba(73, 211, 202,1)'}
                        style={styles.optionIcon}
                      />
                    );
                  else return;
                })()}
                {(() => {
                  if (item.userVote == '1')
                    return (
                      <Text
                        style={{
                          color: '#000000',
                          fontWeight: '500',
                          fontSize: 11,
                        }}>
                        {item.opt1}
                      </Text>
                    );
                  else if (item.userVote == '2')
                    return (
                      <Text
                        style={{
                          color: '#000000',
                          fontWeight: '500',
                          fontSize: 11,
                        }}>
                        {item.opt2}
                      </Text>
                    );
                  else return;
                })()}
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
        <Divider width={0.5} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
      <View style={{flex: 0.5, marginBottom: '0.7%'}}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="논쟁 제목을 검색해 보세요."
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}></TextInput>
      </View>
      <View style={{flex: 5.5}}>
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
    color: '#000000',
    fontSize: 14,
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
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
