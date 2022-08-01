import {StyleSheet, Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {BOARDS} from '../../data/boards'


export default function FlowScreen({navigation}) {
  const [boards, setBoards] = useState([]);
  const [user_like, setUserLike] = useState([]);
  const [user_vote, setUserVote] = useState([]);

  useEffect(() => {
    (async ()=> {
      // const {data} = await axios.get("님들 서버 URL");
      setBoards(BOARDS);
    })  ()
  }, [boards])

  const [opt1_selected, setOpt1Selected] = useState(boards.opt1_selected);
  const [opt2_selected, setOpt2Selected] = useState(boards.opt2_selected);
  
  const opt1_ratio = Math.round(
    (opt1_selected / (opt1_selected + opt2_selected)) * 100
  );
  const opt2_ratio = 100 - opt1_ratio;
  const leftSize = opt1_ratio + '%';
  const rightSize = opt2_ratio + '%';


  
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={{flex: 1}}>
      <View style={{flex:1}}>
      <FlatList
        style= {{}}
        keyExtractor={(item) => item.id}
        data={boards}
        navigation={navigation}
        renderItem={({item}) => (
          <View style={{height:windowHeight*0.935, flex: 1, borderWidth: 5, backgroundColor: 'white'}}>
            <View style={{flex: 1.2, alignItems: 'center', justifyContent: 'flex-end'}}>
                <Text style={{fontWeight: 'bold'}}>#{} #{} #{} 사용자들이</Text>
                <Text style={{fontWeight: 'bold'}}>많이 참여한 논쟁입니다.</Text>
            </View>
            <View style={{flex: 4, justifyContent: 'center'}}>
                <View style={{width: '80%', height: '50%', borderWidth: 1, borderRadius: 5, alignSelf: 'center', paddingVertical: '5%'}}>
                    <Text style={{ flex: 3, textAlign: 'center', jusfityContent: 'center', fontSize: 23, fontWeight: 'bold'}}>{item.title}</Text>
                    <View style={{ flex: 1.8, alignSelf: 'center'}} boards={boards} user_vote = {user_vote} setUserLike= {setUserVote}>
                        <View style={styles.barContainer}>
                            <TouchableOpacity
                                style={styles.leftBar(user_vote, leftSize)}
                                disabled={user_vote > 0}
                                onPress={() => setUserVote(1)}>
                                <Text style={styles.leftInnerText(user_vote)}>{item.opt1}</Text>
                                {user_vote > 0 && (
                                    <Text style={styles.leftInnerText(user_vote)}>{leftSize}</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.rightBar(user_vote, rightSize)}
                                disabled={user_vote > 0}
                                onPress={() => setUserVote(2)}>
                                <Text style={styles.rightInnerText(user_vote)}>{item.opt2}</Text>
                                {user_vote > 0 && (
                                    <Text style={styles.rightInnerText(user_vote)}>{rightSize}</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginLeft: '10%', marginTop: '2.5%'}}> 
                    <Text>작성자 :  </Text>
                    <Image style={{ width:15 ,height:15, borderRadius:50 }} source={{uri : item.writer.img}}></Image>
                    <Text>{item.writer.nickname}</Text>
                </View>
            </View>
            <View boards={boards} user_like = {user_like} setUserLike= {setUserLike} 
                  style={{flex: 1.2, alignItems: 'flex-end'}}>
                <TouchableOpacity
                style={styles.clickDetail}
                onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
                    <MaterialCommunityIcons name={'text-box-search-outline'} size={35} color={'gray'} /> 
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.clickLike} 
                    onPress={() => setUserLike(Math.abs(1-user_like))}>
                      <AntDesign style={styles.iconColor(user_like)} name="heart" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    
        )}
        >
        </FlatList>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  clickDetail: {
    paddingRight: '2.5%',
    marginTop: '3%'
  },
  clickLike: {
    paddingRight: '2.8%',
    marginTop: '3%'
  },
  iconColor : (user_like) => ({
    color : user_like === 1 ? '#FF7171' : '#606060'
  }),
  barContainer: {
    height: 80,
    width: '100%',
    padding: '5%',
    flexDirection: 'row',
  },
  leftBar: (user_vote, leftSize) => ({
    width: user_vote === 0 ? '50%' : leftSize,
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      user_vote === 1 ? 'rgba(255,99,99,1)' : 'rgba(255,99,99,0.3)',
  }),
  rightBar: (user_vote, rightSize) => ({
    width: user_vote === 0 ? '50%' : rightSize,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    backgroundColor:
      user_vote === 2 ? 'rgba(131,227,209,1)' : 'rgba(131,227,209,0.3)',
  }),
  leftInnerText: user_vote => ({
    color: 'white',
    fontWeight: user_vote === 0 ? '' : user_vote === 1 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
  }),
  rightInnerText: user_vote => ({
    color: 'white',
    fontWeight: user_vote === 0 ? '' : user_vote === 2 ? 'bold' : '',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15,
  }),

});