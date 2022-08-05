import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useContext} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserContext from '../../util/UserContext';

export default function FlowBottom({boards, setBoards, board, setBoard, navigation}) {
  const {userData} = useContext(UserContext);

  const like = () => {
    UseAxios.post(`/boards/${board.boardId}/like`, null, { params : {
      userId : userData.userId,
    }})
      .then(res => {
        console.log(res);
      })
      .then(err => {
        console.log(err);
      });
  };
  const unlike = () => {
    UseAxios.delete(`/boards/${board.boardId}/unlike?userId=${userData.userId}`)
      .then(res => {
        console.log(res);
      })
      .then(err => {
        console.log(err);
      });
  };

  const toggleLike = () => {
    setBoards({...board, userLike: !board.userLike});
  };

  return (
    <View style={{flex: 0.25}}>
       <View
            style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
            <TouchableOpacity
                style={styles.clickDetail}
                onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
                    <MaterialCommunityIcons name={'text-box-search-outline'} size={35} color={'gray'} /> 
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.clickLike} 
                onPress={() => [toggleLike(), board.userLike ? unlike() : like() ]}>
                      <AntDesign style={styles.iconColor(board.userLike)} name="heart" size={30} />
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
    iconColor : userLike => ({
      color: userLike ? '#FF7171' : '#606060',
    }),
    clickWriter: {
        width:30 ,
        height:30, 
        borderRadius:50, 
        marginRight: '3%',
        marginTop: '3.5%' 
    }
  });