import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, StatusBar, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const FirstRoute = () => (
  <View
    style={[
      styles.scene,
      {
        backgroundColor: 'white',
        // borderTopWidth: 0.3,
        // borderTopColor: '#808080',
      },
    ]}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
      <View>
        <View></View>
      </View>
    </KeyboardAwareScrollView>
  </View>
);

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
      borderWidth: 1.5,
      borderColor: '#FF7171',
      width: '30%',
      marginHorizontal: '6.5%',
    }}
    tabStyle={{
      marginHorizontal: 30,
      // borderWidth: 1,
    }}
    pressColor={'white'}
    indicatorContainerStyle={{}}
    style={{
      backgroundColor: 'white',
      shadowColor: 'white',
      borderBottomWidth: 0.3,
      borderBottomColor: '#808080',
      borderTopWidth: 0.3,
      borderTopColor: '#808080',
      marginHorizontal: '7%',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={
          focused
            ? {
                color: '#FF7171',
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
  first: FirstRoute,
  second: SecondRoute,
});

export default function DetailScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: '댓글'},
    {key: 'second', title: '분석'},
  ]);

  return (
    <View style={styles.container}>
      <View style={{flex: 6, borderWidth: 2}}>
        <Text>DetailScreen1</Text>
      </View>
      <View style={{flex: 1, borderWidth: 2}}>
        <Text>DetailScreen2</Text>
      </View>
      <View style={{flex: 6}}>
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
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  scene: {
    flex: 1,
  },
});
