import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { Tab, TabView, Divider } from '@rneui/themed';
import React, { useContext } from 'react';
import { USERS } from '../../data/user';
import { ARGUS } from '../../data/argus';
import AntDesign from 'react-native-vector-icons/AntDesign'



export default function UserPageScreen({navigation}) {
    const [index, setIndex] = React.useState(0);
    
    return (
        <View style={{flex: 1}}>
            {/* 설정 버튼 */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.push('SettingNav', {screen: 'SettingNav'})}>
                <AntDesign name={'setting'} size={28} color={'gray'} /> 
            </TouchableOpacity>
          
            <View style={{flex: 0.2}}>
                {/* 프로필 이미지, 팔로우/팔로워*/} 
                <View style = {{ flexDirection: "row", alignItems: 'center'}}>
                    {/* 프로필 이미지 */}
                    <View style={styles.profileImageBox}>
                        {USERS.map((profile, index) => (
                            <View key={index}>
                                <Image source={{uri: profile.imageUrl}} style={styles.profileImage}/>   
                            </View>
                        ))}
                    </View>
                    {/* 팔로우/팔로워 */}
                    <View style={styles.followsBox}>
                        {USERS.map((profile, index) => (
                            <View key={index} style={styles.follows}>
                                <TouchableOpacity
                                    onPress={() => navigation.push('FollowerScreen', {screen: 'FollowerScreen'})}>
                                    <Text> follower</Text>
                                    <Text style={{alignSelf: 'center'}}> {profile.follower}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.push('FollowerScreen', {screen: 'FollowerScreen'})}>
                                    <Text> following</Text>
                                    <Text style={{alignSelf: 'center'}}> {profile.following}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            <View style={{flexDirection: 'row', flex: 0.1}}>
                {/* 닉네임, 특징 */}
                <View style={{marginStart: '5%' }}> 
                    {USERS.map((profile, index) => (
                        <View key={index}>
                            <Text> {profile.user}</Text>
                            <Text> {profile.gender} / {profile.mbti} / {profile.age}</Text>
                        </View>
                    ))}
                </View>
                {/* 팔로우 버튼 */}
            </View>

            {/* 내X논 시리즈 탭뷰 */}
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                  backgroundColor: 'red',
                  height: 3,
                }}
                variant="white"
            >
                <Tab.Item
                    title="내찜논"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                />
                <Tab.Item
                    title="내참논"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                />
                <Tab.Item
                    title="내만논"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                />
            </Tab>
            
            {/* 내X논 시리즈 리스트 */}
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView>
                        {ARGUS.map((myargu, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    style={styles.detail} 
                                    onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
                                    <AntDesign name={'doubleright'} size={20} color={'gray'} /> 
                                </TouchableOpacity>
                                <Text style={{ paddingStart: 5, paddingTop: 15, paddingBottom: 35 }}> {myargu.jjim}</Text>
                                <Divider height={1} orientation='vertical' style={{ backgroundColor: 'black' }} />
                            </View>
                        ))}
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView>
                        {ARGUS.map((myargu, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    style={styles.detail} 
                                    onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
                                    <AntDesign name={'doubleright'} size={20} color={'gray'} /> 
                                </TouchableOpacity>
                                <Text style={{ paddingStart: 5, paddingTop: 15, paddingBottom: 35 }}> {myargu.did}</Text>
                                <Divider height={1} orientation='vertical' style={{ backgroundColor: 'black' }} />
                            </View>
                        ))}
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <ScrollView>
                        {ARGUS.map((myargu, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    style={styles.detail} 
                                    onPress={() => navigation.push('DetailScreen', {screen: 'DetailScreen'})}>
                                    <AntDesign name={'doubleright'} size={20} color={'gray'} /> 
                                </TouchableOpacity>
                                <Text style={{ paddingStart: 5, paddingTop: 15, paddingBottom: 35 }}> {myargu.made}</Text>
                                <Divider height={1} orientation='vertical' style={{ backgroundColor: 'black' }} />
                            </View>
                        ))}
                    </ScrollView>
                </TabView.Item>
            </TabView>
        </View>
    );
    
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'flex-end', flex: 0.05, margin: '1.5%'
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
