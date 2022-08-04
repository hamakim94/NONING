import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function FlowBottom({boards, setBoards, board, setBoard, navigation}) {

    const [user_like, setUserLike] = useState([]);

  return (
    <View style={{flex: 0.25}}>
       <View boards={boards} user_like = {user_like} setUserLike= {setUserLike} 
            style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
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
            <TouchableOpacity 
            style={{flexDirection: 'row',}} 
            onPress={() => navigation.push('YourPageScreen', {screen: 'YourPageScreen'})}>
            <Text>작성자 이미지 클릭시 유어페이지 이동</Text>
            {/* <Image style={styles.clickWriter} source={{uri : board.writer.img}}></Image> */}
        </TouchableOpacity>
        </View>
    </View>
  )
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
    clickWriter: {
        width:30 ,
        height:30, 
        borderRadius:50, 
        marginRight: '3%',
        marginTop: '3.5%' 
    }
  });