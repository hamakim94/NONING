import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import { USER } from '../../data/user'
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign'
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';
import { useIsFocused } from '@react-navigation/native';

export default function VoteLike({navigation, id}) {
  // console.log(USER.boardList)
console.log(id)

  const {userData} = useContext(UserContext);
  const [myPageData, setMyPageData] = useState([])
  const isFocused = useIsFocused();
  useEffect(() => {
    const voteId = id === null ? userData.userId : id
    UseAxios.get(`/users/${voteId}/page`).then(res => {
      setMyPageData(res.data)
      console.log(res.data)
    })
  }, [isFocused]);
  return (
      <View style={{flex:1}}>
          <FlatList
              style= {{paddingVertical: '1%'}}
              keyExtractor={(item) => item.boardId}
              data={myPageData.boardList}              
              navigation={navigation}
              renderItem={({item}) => (
                  <View style={item.userLike !== false ? {borderBottomWidth: 0.3} : {borderBottomWidth: 0}}>
                      <View style={{flex: 1.2, alignContent: 'center', justifyContent: 'center'}}>
                      {(() => {
                          if (item.userLike !== false) return <View>
                                  <TouchableOpacity
                                      style={styles.detail} 
                                      onPress={() => navigation.push('DetaiUselScreen', {screen: 'DetailScreen'})}>
                                      <AntDesign name={'doubleright'} size={20} color={'gray'} /> 
                                  </TouchableOpacity>
                                  <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                                  <View style={{ flexDirection: 'row', marginVertical: '2%'}}>
                                      {(() => {
                                          if (item.userVote === 1) return <AntDesign name={'checkcircleo'} size={15} color={'red'} />
                                          else if (item.userVote === 2) return <AntDesign name={'checkcircleo'} size={15} color={'blue'} />
                                          else return  
                                      })()}
                                      {(() => {
                                          if (item.userVote === 1) return <Text style={{fontWeight: 'bold'}}>{item.opt1}</Text>
                                          else if (item.userVote === 2 ) return <Text style={{fontWeight: 'bold'}}>{item.opt2}</Text> 
                                          else return 
                                          })()}
                                  </View>
                              </View>
                          else return;
                      })()} 
                  </View>
              </View>
              )}>
          </FlatList>
      </View>
  )
}

const styles = StyleSheet.create({
detail: {
  paddingTop: '0.8%',
  paddingRight: '1.5%',
  alignSelf: 'flex-end',
},
  
});