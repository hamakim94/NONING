import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, length} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { USER } from '../../data/user';
import VoteLike from '../userpage/VoteLike';
import VoteDo from '../userpage/VoteDo';
import VoteWrite from '../userpage/VoteWrite';
import AntDesign from 'react-native-vector-icons/AntDesign'


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#FF5A6E',
      width: '8%',
      marginHorizontal: '7%',
    }}
    tabStyle={{
      paddingBottom: '10%',
      paddingTop: '1%',
    }}
    pressColor={'transparent'}
    style={{
      backgroundColor: 'white',
      shadowColor: 'white',
      borderBottomWidth: 0.3,
      borderBottomColor: '#808080',
      borderTopColor: '#808080',
      height: '10%',
    }}
    renderLabel={({route, focused}) => (
      <Text
        style={
          focused
            ? {
                color: '#FF5A6E',
                margin: 0,
                padding: 0,
                fontWeight: 'bold',
                fontSize: 15,
              }
            : {margin: 0, padding: 0, color: '#808080', fontSize: 15}
        }>
        {route.title}
      </Text>
    )}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

const renderScene = SceneMap({
  0: VoteLike,
  1: VoteDo,
  2: VoteWrite
});

export default function UserPageScreen({navigation}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 0, title: '내찜논'},
    {key: 1, title: '내참논'},
    {key: 2, title: '내만논'},
    
  ]);
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('SettingNav', {screen: 'SettingNav'})}>
            <AntDesign name={'setting'} size={28} color={'gray'} /> 
        </TouchableOpacity>
          
        <View style={{flex: 0.23}}>
            {/* 프로필 이미지, 팔로우/팔로워*/} 
            <View style = {{ flexDirection: "row", alignItems: 'center'}}>
                {/* 프로필 이미지 */}
                <View style={styles.profileImageBox}>

                        <View>
                            <Image source={{uri: USER.user.img}} style={styles.profileImage}/>   
                        </View>

                </View>
                {/* 팔로우/팔로워 */}
                <View style={styles.followsBox}>
                  
                        <View style={styles.follows}>
                            <TouchableOpacity
                                onPress={() => navigation.push('FollowerScreen', {screen: 'FollowerScreen'})}>
                                <Text> follower</Text>
                                <Text style={{alignSelf: 'center'}}> {USER.followee_list.length}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.push('FollowerScreen', {screen: 'FollowerScreen'})}>
                                <Text> following</Text>
                                <Text style={{alignSelf: 'center'}}> {USER.followee_list.length}</Text>
                            </TouchableOpacity>
                        </View>

                </View>
            </View>
        </View>

        <View style={{flexDirection: 'row', flex: 0.15}}>
            {/* 닉네임, 특징 */}
            <View style={{marginStart: '5%' }}> 

                    <View >
                        <Text style={{marginBottom: '1.5%'}}> {USER.user.nickname}</Text>
                        <Text> {USER.user.gender_code} / {USER.user.mbti1_code}{USER.user.mbti2_code}{USER.user.mbti3_code}{USER.user.mbti4_code} / {USER.user.age_range_code}</Text>
                    </View>

            </View>
            {/* 팔로우 버튼 */}
        </View>

      
        <View style={{flex: 0.9, marginTop: '1%'}}>
            <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '2.5%',
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'flex-end', flex: 0.08, marginVertical: '1.5%'
  },
  profileImageBox: {
    flex: 2,
    alignItems: 'center'
},
profileImage: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 3, 
    borderColor: 'red',
    
},
followsBox: {
    flex: 3,
},
follows: {
    flexDirection: "row", 
    justifyContent: 'space-evenly',
    marginBottom: '20%'
    
},
detail: {
  paddingTop: '0.8%',
  paddingRight: '1.5%',
  alignSelf: 'flex-end',
},

});
