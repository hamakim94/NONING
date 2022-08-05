import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CommentScreen from './CommentScreen';
import AnalysisScreen from './AnalysisScreen';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#FF5A6E',
      width: '20%',
      marginHorizontal: '9.5%',
    }}
    tabStyle={{
      paddingBottom: '6%',
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
      height: '13%',
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
  1: AnalysisScreen,
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
      <View style={{flex: 0.4, borderWidth: 2}}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '7%',
    backgroundColor: 'white',
  },
});
