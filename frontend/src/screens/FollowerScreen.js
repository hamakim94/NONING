import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { PROFILES } from '../data/profile'
import Profile from '../components/follow/Profile'

const FollowerScreen = () => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={{margin:10}}>
      {PROFILES.map( (profile, index) => (
        <Profile profile={profile} key={index}></Profile>
      ))}
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
})
export default FollowerScreen