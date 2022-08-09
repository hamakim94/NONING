import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import CommentScreen from './CommentScreen';
import AnalysisScreen from './AnalysisScreen';
import {useIsFocused} from '@react-navigation/native';
import DetailContext from '../../components/boardDetail/DetailContext';

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
      backgroundColor: '#FFFFFF',
      shadowColor: '#FFFFFF',
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
                width: '110%',
              }
            : {margin: 0, padding: 0, color: '#808080', fontSize: 15}
        }>
        {route.title}
      </Text>
    )}
  />
);

const initialLayout = {width: Dimensions.get('window').width};

export default function DetailScreen({route}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 0, title: '댓글'},
    {key: 1, title: '분석'},
  ]);
  const [participants, setParticipants] = useState(null);
  const boardId = route.params.boardId;
  const isFocused = useIsFocused();
  const renderScene = ({route}) => {
    switch (route.key) {
      case 0:
        return <CommentScreen />;
      case 1:
        return <AnalysisScreen />;
    }
  };
  useEffect(() => {
    if (isFocused) {
      UseAxios.get(`/boards/${boardId}`).then(res => {
        console.log(res);
      });
      UseAxios.get(`/boards/${boardId}/users`).then(res => {
        setParticipants(res.data);
      });
    }
  }, [isFocused]);
  return (
    <DetailContext.Provider value={{boardId, participants}}>
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
    </DetailContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '7%',
    backgroundColor: '#FFFFFF',
  },
});
