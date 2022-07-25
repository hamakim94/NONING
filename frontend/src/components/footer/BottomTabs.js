import { View,  Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState} from 'react'

export const bottomTabsIcons = [
    {
        name : 'Home',
        active : 'https://img.icons8.com/material-rounded/60/FF5F5F/home.png',
        inactive : 'https://img.icons8.com/material-outlined/60/FF5F5F/home--v2.png',

    },
    {
        name : 'Flow',
        active : 'https://img.icons8.com/sf-black-filled/60/FF5F5F/sea-waves.png',
        inactive : 'https://img.icons8.com/sf-ultralight-filled/60/FF5F5F/sea-waves.png',

    },
    {
        name : 'Add',
        active : 'https://img.icons8.com/ios-filled/60/FF5F5F/plus.png',
        inactive : 'https://img.icons8.com/ios/60/FF5F5F/plus--v1.png',

    },
    {
        name : 'Live',
        active : 'https://img.icons8.com/ios-filled/60/FF5F5F/radio-waves.png',
        inactive : 'https://img.icons8.com/ios/60/FF5F5F/radio-waves.png',

    },
    {
        name : 'Profile',
        active : 'https://i.imgur.com/EFeEbuJ.jpeg',
        inactive : 'https://i.imgur.com/EFeEbuJ.jpeg',

    },
]

const BottomTabs = ({icons}) => {

    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({icon}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image 
                source={{uri: activeTab === icon.name ? icon.active : icon.inactive}} 
                style={[
                    styles.icon, 
                    icon.name === 'Profile' ? styles.profilePic() : null,
                    activeTab === 'Profile' && icon.name === activeTab
                        ? styles.profilePic(activeTab)
                        : null

                ]} 
            />
        </TouchableOpacity>
    )
        
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                { icons.map((icon, index) => (
                    <Icon key={index} icon ={icon}></Icon>
                    ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        position :'absolute',
        width :'100%',
        bottom :'0%',
        zIndex : 999,
        backgroundColor: "#fff",
        borderTopWidth : 1,
        borderTopColor : '#808080'
    },
    container : {
        flexDirection:'row',
        justifyContent: 'space-around',
        height:50,
        paddingTop:10,

    },
    icon : {
        width : 30,
        height : 30,
    },
    profilePic : (activeTab = '') => ({
        borderRadius : 50,
        borderWidth: activeTab === 'Profile' ? 2:0,
        borderColor : '#FF5F5F'
    })
})

export default BottomTabs