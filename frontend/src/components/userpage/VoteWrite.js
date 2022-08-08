import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function VoteWrite({navigation, id, myPageData}) {
  const [filteredData, setFilteredData] = useState([]);
  const isArr = Array.isArray(myPageData.boardList)
  useEffect(() => {
    const data = isArr? myPageData.boardList.filter(e=>e.writerId===id):[];
    setFilteredData(data);    
  }, [isArr])

  
  const keyExtractor = item => item.boardId;
  const renderItem = ({item}) => ( 
    
    <View
      style={
        {borderBottomWidth: 0.3} 
        }>
      <View
        style={{
          flex: 1.2,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        {(() => {

            return (
              <View>
                <TouchableOpacity
                  style={styles.detail}
                  onPress={() =>
                    navigation.push('DetailScreen', {
                      screen: 'DetailScreen',
                    })
                  }>
                  <AntDesign name={'doubleright'} size={20} color={'gray'} />
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                <View style={{flexDirection: 'row', marginVertical: '2%'}}>
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
                    else return <Text style={{height:0}}></Text>;
                  })()}
                  {(() => {
                    if (item.userVote === 1)
                      return (
                        <Text style={{fontWeight: 'bold'}}>{item.opt1}</Text>
                      );
                    else if (item.userVote === 2)
                      return (
                        <Text style={{fontWeight: 'bold'}}>{item.opt2}</Text>
                      );
                    else return <Text style={{height:0}}></Text>;
                  })()}
                </View>
              </View>
            );
        })()}
      </View>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{paddingVertical: '1%'}}
        keyExtractor={keyExtractor}
        data={filteredData}
        navigation={navigation}
        renderItem={renderItem}>
        </FlatList>
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
