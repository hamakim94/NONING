import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function VoteDo({navigation, myPageData}) {
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
              item.userVote !== 0
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
                if (item.userVote !== 0)
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
                          else
                            return (
                              <AntDesign
                                name={'checkcircleo'}
                                size={15}
                                color={'blue'}
                              />
                            );
                        })()}
                        {(() => {
                          if (item.userVote === 1)
                            return (
                              <Text style={{fontWeight: 'bold'}}>
                                {item.opt1}
                              </Text>
                            );
                          else
                            return (
                              <Text style={{fontWeight: 'bold'}}>
                                {item.opt2}
                              </Text>
                            );
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
