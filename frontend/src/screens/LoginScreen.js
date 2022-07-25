import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import LoginForm from '../components/loginScreen/LoginForm'
import BottomTabs, { bottomTabsIcons } from '../components/footer/BottomTabs'


const INSTAGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-256.png'

const LoginScreen = () => (

    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={{uri :INSTAGRAM_LOGO, height:70, width:70}}></Image>
            <LoginForm></LoginForm>
        </View>
        <BottomTabs icons={bottomTabsIcons}></BottomTabs>
    </View>

)


const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'white',
      paddingTop:30,
      paddingHorizontal:0
  },
  logoContainer : {
      alignItems : 'center',
      marginTop:30,
  },

})

export default LoginScreen