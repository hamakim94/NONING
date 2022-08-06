import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity} from 'react-native';
import { BOARDS } from '../../data/boards'
import AntDesign from 'react-native-vector-icons/AntDesign';
import UseAxios from '../../util/UseAxios';

const Tab = createMaterialTopTabNavigator();

function BoardSearchScreen(item, setItem, navigation) {
  const [boards, setBoards] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterName, setFilterName] = useState('전체');

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
      setBoards(res.data)
      console.log(setBoards)
    })
  }, [filterName]);

  useEffect(() => {
    featchPosts();
    return () => {

    }
  }, [])

  const featchPosts = () => {
      setfilterdData(boards);
      setmasterData(boards);
 
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase()
                    : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(masterData);
      setSearch(text);
    }
  }

  const ItemSeparatorView = () => {
    return (
      <View 
      style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}>

      </View>
    )
  }

  
  const ItemView = ({item}) => {
    return (
        <View>
          {item
          ? (
            <TouchableOpacity 
                onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
                  <View style={{height: 75, justifyContent: 'center'}}>
                    <Text style={styles.itemStyle}>
                        {item.title.toUpperCase()}
                    </Text>
                    <View style={{flexDirection: 'row'}}> 
                        {(() => {
                            if (item.userVote  == "1") return <AntDesign name={'checkcircleo'} size={15} color={'red'} style={styles.optionIcon}/>
                            else if (item.userVote  == "2") return <AntDesign name={'checkcircleo'} size={15} color={'blue'} style={styles.optionIcon}/>
                            else return  
                        })()}
                        {(() => {
                            if (item.userVote  == "1") return <Text>{item.opt1}</Text>
                            else if (item.userVote  == "2") return <Text>{item.opt2}</Text> 
                            else return 
                        })()}
                    </View>
                </View>
            </TouchableOpacity> )
          : ('')}
        </View>
    )
  }




  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={StyleSheet.container}>
        <TextInput
          style = {styles.textInputStyle}
          value={search}
          placeholder="논쟁 제목을 검색해 보세요."
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        >       
        </TextInput>
        <FlatList
        data={filterdData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}>
        </FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  itemStyle: {
    paddingTop: '3%',
    marginLeft: '3.5%',
    paddingBottom: '1.5%',
    fontWeight: 'bold'
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10
  },
  optionIcon: {
    marginLeft: '3.5%',
    marginRight: '1%',
    paddingTop: '0.5%',
    marginBottom: '3%'
  }

})
export default BoardSearchScreen;
