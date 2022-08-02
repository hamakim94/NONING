import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

// 찜 : /api/boards/{boardid}/like          input : userId, reg
// 찜 취소 : /api/boards/{boardid}/unlike   input : userId

export default function BoardFooter({board, setBoards}) {
  
  const toggleLike = () => {
    setBoards({...board, userLike : !board.userLike})

  }
  
  return (
    <View style={styles.footerContainer}>
      <View style={styles.writerContainer}> 
        <Text>작성자 :  </Text>
        {/* <Image style={{ width:15 ,height:15, borderRadius:50 }} source={{uri : board.writer.img}}></Image> */}
        <Text>{board.writerNickname} </Text>
      </View>

      <View style={styles.numberLikeContainer}>
        <Text>참여 : {board.opt1Selected + board.opt2Selected}명</Text>
        <TouchableOpacity style={{margin:1}} onPress={() => toggleLike()}>
          <AntDesign style={styles.iconColor(board.userLike)} name="heart" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  iconColor : (userLike) => ({
    color : userLike? '#FF7171' : '#606060'
  })
});
