import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Avatar} from '@rneui/themed';
import CommentScreen from './CommentScreen';

const SecondRoute = () => (
  <View
    style={[
      styles.scene,
      {
        backgroundColor: 'white',
        // borderTopWidth: 0.3,
        // borderTopColor: '#808080',
      },
    ]}
  />
);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#FF5A6E',
      width: '30%',
      marginHorizontal: '6.5%',
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
      borderTopWidth: 0.3,
      borderTopColor: '#808080',
      marginHorizontal: '7%',
      height: '12%',
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
  0: CommentScreen,
  1: SecondRoute,
});

export default function DetailScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 0, title: '댓글'},
    {key: 1, title: '분석'},
  ]);

  return (
    <View style={styles.container}>
      <View style={{flex: 2.4, borderWidth: 2}}>
        <Text>DetailScreen1</Text>
      </View>
      <View style={{flex: 0.2, borderWidth: 2}}>
        <Text>DetailScreen2</Text>
      </View>
      <View style={{flex: 3.2, marginTop: '1%'}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
      </View>
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
  },
});
