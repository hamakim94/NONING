import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PasswordChange from '../components/setting/PasswordChange'
import BottomTabs, { bottomTabsIcons } from '../components/footer/BottomTabs'

const PasswordChangeScreen = () => {
  return (
    <View style={styles.container}>
        <View style={{paddingHorizontal:20}}>
            <PasswordChange></PasswordChange>  
        </View>
        
        <BottomTabs icons={bottomTabsIcons}></BottomTabs>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        paddingTop:30,
    },
})

export default PasswordChangeScreen