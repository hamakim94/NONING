import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function VoteDo({navigation, myPageData}) {
  const keyExtractor = (item) => item.boardId;
  let obj = myPageData.boardList
    ? myPageData.boardList.filter((e) => e.userVote !== 0)
    : [];
  return (
    <View style={{flex: 1}}>
      {obj.length === 0 ? (
        <Text>텅~ 참여한 논쟁이 없어요</Text>
      ) : (
        <FlatList
          style={{paddingVertical: '1%'}}
          keyExtractor={keyExtractor}
          data={obj}
          navigation={navigation}
          renderItem={({item}) => (
            <View
              style={
                item.userVote !== 0
                  ? {borderBottomWidth: 0.3, borderBottomColor: '#A6A6A6'}
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
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginVertical: '2%',
                        }}>
                        <View
                          style={{
                            flex: 9,
                            marginStart: 5,
                            justifyContent: 'center',
                            height: 50,
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: '#000000',
                              marginTop: '2.5%',
                              marginBottom: '1.5%',
                              fontSize: 14,
                            }}>
                            {item.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginBottom: '1.5%',
                            }}>
                            {(() => {
                              if (item.userVote === 1)
                                return (
                                  <EvilIcons
                                    name={'sc-instagram'}
                                    size={15}
                                    color={'rgba(255,95,95,1)'}
                                    style={{margin: 2}}
                                  />
                                );
                              else
                                return (
                                  <EvilIcons
                                    name={'sc-instagram'}
                                    size={15}
                                    color={'rgba(73, 211, 202,1)'}
                                    style={{margin: 2}}
                                  />
                                );
                            })()}
                            {(() => {
                              if (item.userVote === 1)
                                return (
                                  <Text
                                    style={{
                                      fontWeight: '500',
                                      color: '#000000',
                                      fontSize: 11,
                                    }}>
                                    {item.opt1}
                                  </Text>
                                );
                              else
                                return (
                                  <Text
                                    style={{
                                      fontWeight: '500',
                                      color: '#000000',
                                      fontSize: 11,
                                    }}>
                                    {item.opt2}
                                  </Text>
                                );
                            })()}
                          </View>
                        </View>
                        <View style={{flex: 1}}>
                          <TouchableOpacity
                            style={styles.detail}
                            onPress={() =>
                              navigation.push('DetailNav', {
                                screen: 'DetailScreen',
                                params: {boardId: item.boardId},
                              })
                            }>
                            <Feather
                              name={'chevrons-right'}
                              size={25}
                              color={'#c9c9c9'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  else return;
                })()}
              </View>
            </View>
          )}></FlatList>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    alignSelf: 'flex-end',
  },
});
