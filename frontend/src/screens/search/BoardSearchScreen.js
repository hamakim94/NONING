import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SafeAreaView, View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity} from 'react-native';
import { BOARDS } from '../../data/boards'
import AntDesign from 'react-native-vector-icons/AntDesign';


const Tab = createMaterialTopTabNavigator();

function BoardSearchScreen(item, setItem) {
  const [filterdData, setfilterdData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    featchPosts();
    return () => {

    }
  }, [])

  const featchPosts = () => {
      setfilterdData(BOARDS);
      setmasterData(BOARDS);
 
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

  const toggleLike = () => {
    setItem({...item, user_like : !item.user_like})

  }

  const ItemSeparatorView = () => {
    return (
      <View 
      style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}>

      </View>
    )
  }
  const opt1_ratio = Math.round(
    (item.opt1_selected / (item.opt1_selected + item.opt2_selected)) * 100
  );

  const opt2_ratio = 100 - opt1_ratio;
  const leftSize = opt1_ratio + '%';
  const rightSize = opt2_ratio + '%';
   
  const setOpt1_selected = () => {
    setItem({...item, opt1_selected: item.opt1_selected + 1, user_vote : 1})
  };
  const setOpt2_selected = () => {
    setItem({...item, opt2_selected: item.opt2_selected + 1, user_vote : 2})
  };

  
  const ItemView = ({item}) => {
    return (
        <View>
            <View style={styles.liveContainer}>
                <Text style={styles.liveButton(item.live)} >LIVE</ Text>
                <TouchableOpacity style={{marginHorizontal:6}} disabled={item.user_vote === 0} onPress={() =>
                    navigation.navigate('HomeDetail', {screen: 'HomeDetail'})}>
                    <AntDesign style={styles.detail(item.user_vote)} name="doubleright" size={20} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.itemStyle}>
                    {item.title.toUpperCase()}
                </Text>
            </View>
            <View style={{}}>
                <TouchableOpacity
                    style={styles.leftBar(item.user_votee, leftSize)}
                    disabled={item.user_votee > 0}
                    onPress={() => setOpt1_selected()}>
                    <Text style={styles.leftInnerText(item.user_votee)}>{item.opt1}</Text>
                    {item.user_votee > 0 && (
                    <Text style={styles.leftInnerText(item.user_votee)}>{leftSize}</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rightBar(item.user_votee, rightSize)}
                    disabled={item.user_votee > 0}
                    onPress={() => setOpt2_selected()}>
                    <Text style={styles.rightInnerText(item.user_votee)}>{item.opt2}</Text>
                    {item.userVote > 0 && (
                    <Text style={styles.rightInnerText(item.user_votee)}>
                        {rightSize}
                    </Text>
                    )}
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.footerContainer}>
                    <View style={styles.writerContainer}> 
                        <Text>작성자 :  </Text>
                        {/* <Image style={{ width:15 ,height:15, borderRadius:50 }} source={{uri : board.writer.img}}></Image> */}
                        <Text>{item.writer.nickname} </Text>
                    </View>
                    <View style={styles.numberLikeContainer}>
                        <Text>참여 : {item.opt1_selected + item.opt2_selected}명</Text>
                        <TouchableOpacity style={{margin:1}} onPress={() => toggleLike()}>
                            <AntDesign style={styles.iconColor(item.user_like)} name="heart" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    padding: 15
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
  barContainer: {
    height: 80,
    width: '100%',
    padding: '3%',
    flexDirection: 'row',
  },
  leftBar: (userVote, leftSize) => ({
    width: userVote === 0 ? '50%' : leftSize,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      userVote === 1 ? 'rgba(255,90,110,1)' : 'rgba(255,90,110,0.3)',
  }),
  rightBar: (userVote, rightSize) => ({
    width: userVote === 0 ? '50%' : rightSize,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      userVote === 2 ? 'rgba(131,227,209,1)' : 'rgba(131,227,209,0.3)',
  }),
  leftInnerText: userVote => ({
    color: 'white',
    fontWeight: userVote === 0 ? '' : userVote === 1 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
  rightInnerText: userVote => ({
    color: 'white',
    fontWeight: userVote === 0 ? '' : userVote === 2 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 17,
  }),
  footerContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writerContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  numberLikeContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  iconColor : (user_like) => ({
    color : user_like? '#FF7171' : '#606060'
  }),
  liveContainer: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
  },
  liveButton: (live) => ({
    width: 40,
    borderColor: live ? '#FF7171' : '#808080',
    borderRadius: 5,
    color: live  ? '#FF7171' : '#808080',
    borderWidth: live  ? 2 : 1,
    fontWeight: 'bold',
    fontSize: 12,
    margin: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
  detail: (user_vote) => ({
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    marginHorizontal: 5,
    color : user_vote > 0 ? '#000000' : '#ffffff',
  }),

})
export default BoardSearchScreen;
