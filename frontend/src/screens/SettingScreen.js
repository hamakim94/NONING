import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/themed';
import BottomTabs, { bottomTabsIcons } from '../components/footer/BottomTabs'

const showAlert = () =>
  Alert.alert(
    "끼요옷",
    "로그아웃 하시겠습니까?",
    [
        {text: '획인', onPress: () => console.log('로그아웃완료')},
        {text: '취소', onPress: () => console.log('취소버튼'), style: 'cancel'},
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "밖 누르지 마"
        ),
    }
  );

const SettingScreen = () => (
    <SafeAreaView style={styles.container}>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <TouchableOpacity style={styles.menuContainer}> 
                <Text style={{fontSize:18, fontWeight : 'bold'}}> 프로필 편집 </Text>
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <TouchableOpacity style={styles.menuContainer}>
                <Text style={{fontSize:18, fontWeight : 'bold'}}> 비밀번호 변경 </Text>
                
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <TouchableOpacity style={styles.menuContainer}>
                <Text style={{fontSize:18, fontWeight : 'bold'}}> 문의하기 </Text>
                
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <TouchableOpacity style={styles.menuContainer}>
                <Text style={{fontSize:18, fontWeight : 'bold'}}> 서비스 이용약관 </Text>
                
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <TouchableOpacity style={styles.menuContainer}>
                <Text style={{fontSize:18, fontWeight : 'bold'}}> 개인정보 처리방침 </Text>
                
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <TouchableOpacity style={styles.menuContainer} onPress={showAlert}>
                <Text style={{fontSize:18, fontWeight : 'bold'}}> 로그아웃 </Text>
                
            </TouchableOpacity>
            <View style={{marginHorizontal:10}}>
                <Divider width={1} orientation='horizontal' ></Divider>
            </View>
            <BottomTabs icons={bottomTabsIcons}></BottomTabs> 
          
    </SafeAreaView>
)

const styles = StyleSheet.create({
    container: {    
        flex:1,
    },
    menuContainer : {
        flexDirection : 'row',
        height:60,
        paddingHorizontal : 20,
        margin:10,
        alignItems : 'center',
    },
  
  })
  
export default SettingScreen