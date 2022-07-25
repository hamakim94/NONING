import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'

const Profile = ({profile}) => (
    <View style={styles.wrapper}>
        <View style={styles.profileContainer}>
            <View style={{flex:1.3, alignContent : 'center', justifyContent : 'center'}}>
                <Image source={{uri : profile.imageUrl }} style={styles.profileImage}></Image>
            </View>
            <View style={{flex:3.7, justifyContent:'center'}}>
                <Text style ={{ fontSize: 20, fontWeight : '700'}}>{profile.user}</Text>
                <Text>{profile.gender} / {profile.mbti} / {profile.age} </Text>
            </View>
            <View style={{flex:1 ,justifyContent:'center'}}>
                <TouchableOpacity>
                    <Button 
                        title= {profile.isFollower ? '팔로잉' : '팔로우'}
                        color = {profile.isFollower ? '#FF5F5F' : 'rgba(255,95,95,0.25)'}
                        onPress = { () => { !profile.isFollower}}>
                        
                    </Button>
                </TouchableOpacity>
            </View>
        </View>
    </View>
)

const styles = StyleSheet.create({
    wrapper :{
        marginVertical : 5,
        borderBottomWidth : 1,
        borderColor : '#808080',
    },

    profileContainer : {
        flexDirection : 'row',
        height:80,
        paddingHorizontal : 20

    },
    profileImage :{
        width:50,
        height:50,
        borderRadius: 50,
        borderWidth :1,
        borderColor:'#ff8501',
    },

})

export default Profile