import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'



export default function Boards() {

  return (
    <View style={styles.container}>
      <View style={styles.liveContainer}>
        <Text style={styles.isLiveButton}>LIVE</Text>
        <TouchableOpacity style={styles.votedDetail}>
          <AntDesign style={styles.detail} name="doubleright" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
          <Text style={styles.titleText}>퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 {'\n' }내가 뒷자리에 앉아서 타야된다면?</Text>
      </View>
      <View style={styles.barContainer}>
        <View style={{flex:1, borderWidth:1, borderTopLeftRadius:5, borderBottomLeftRadius:5, justifyContent:'center', backgroundColor: 'rgba(255,99,99,0.3)' }}>
          <Text style={{textAlign:'center', textAlignVertical :'center'}}>용서 가능</Text>
        </View>
        <View style={{flex:1, borderWidth:1, borderTopRightRadius:5, borderBottomRightRadius:5, justifyContent:'center', backgroundColor:'rgba(131,227,209,0.3)' }}>
          <Text style={{textAlign:'center', textAlignVertical :'center'}}>용서 불가능</Text>
        </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    marginTop:10,
    height: 300,
    width:'100%',
    borderWidth:1,
    borderRadius:5, 
  },
  liveContainer :{
    height: '10%',
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    margin:'1%',
  },
  titleText :{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    textAlignVertical :'center',
  },
  titleContainer :{  
    height: 150,
    width:'100%',
    justifyContent:'center', 
    alignItems :'center'
  },
  barContainer :{
    height: 100,
    width:'100%',
    padding:'5%',
    flexDirection:'row'
  },
  writerContainer:{
    height: 30,
    width:'100%',
    borderBottomWidth:1,
  },
  isLiveButton:{
    width:50,
    borderColor : '#FF7171',
    borderRadius:5,
    color:'#FF7171',
    borderWidth:2,
    fontWeight:'bold',
    fontSize:15,
    margin:2,
    textAlign:'center',
    textAlignVertical:'center',
  },
  notLiveButton:{
    width:50,
    borderColor : '#808080',
    borderRadius:5,
    color:'#808080',
    borderWidth:1,
    fontSize:15,
    margin:2,
    textAlign:'center',
    textAlignVertical:'center',
  },
  votedDetail:{
    justifyContent:'center',
    alignItems:'center',
    margin:1,
    marginHorizontal:5,
  },
  notVotedDetail:{
    justifyContent:'center',
    alignItems:'center',
    margin:1,
    marginHorizontal:5,
  }
})