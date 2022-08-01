import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { PROFILES } from '../data/profile'
import Profile from '../components/follow/Profile'
import BottomTabs, { bottomTabsIcons } from '../components/footer/BottomTabs'

const FollowerScreen = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={{margin:10}}>
      {PROFILES.map( (profile, index) => (
        <Profile profile={profile} key={index}></Profile>
      ))}
    </ScrollView>
    <BottomTabs icons={bottomTabsIcons}></BottomTabs>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
})
export default FollowerScreen