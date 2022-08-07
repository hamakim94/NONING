import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function VoteLike({navigation, myPageData}) {
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{paddingVertical: '1%'}}
        keyExtractor={item => item.boardId}
        data={myPageData.boardList}
        navigation={navigation}
        renderItem={({item}) => (
          <View
            style={
              item.userLike !== false
                ? {borderBottomWidth: 0.3}
                : {borderBottomWidth: 0}
            }>
            <View
              style={{
                flex: 1.2,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              {(() => {
                if (item.userLike !== false)
                  return (
                    <View>
                      <TouchableOpacity
                        style={styles.detail}
                        onPress={() =>
                          navigation.push('DetailScreen', {
                            screen: 'DetailScreen',
                          })
                        }>
                        <AntDesign
                          name={'doubleright'}
                          size={20}
                          color={'gray'}
                        />
                      </TouchableOpacity>
                      <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                      <View
                        style={{flexDirection: 'row', marginVertical: '2%'}}>
                        {(() => {
                          if (item.userVote === 1)
                            return (
                              <AntDesign
                                name={'checkcircleo'}
                                size={15}
                                color={'red'}
                              />
                            );
                          else if (item.userVote === 2)
                            return (
                              <AntDesign
                                name={'checkcircleo'}
                                size={15}
                                color={'blue'}
                              />
                            );
                          else return;
                        })()}
                        {(() => {
                          if (item.userVote === 1)
                            return (
                              <Text style={{fontWeight: 'bold'}}>
                                {item.opt1}
                              </Text>
                            );
                          else if (item.userVote === 2)
                            return (
                              <Text style={{fontWeight: 'bold'}}>
                                {item.opt2}
                              </Text>
                            );
                          else return;
                        })()}
                      </View>
                    </View>
                  );
                else return;
              })()}
            </View>
          </View>
        )}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    paddingTop: '0.8%',
    paddingRight: '1.5%',
    alignSelf: 'flex-end',
  },
});
