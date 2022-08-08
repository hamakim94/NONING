import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import UseAxios from '../util/UseAxios'

function FollowerScreen({route, navigation}) {
  const [followData, setFollowData] = useState([]);
  const id = route.params.id;

  useEffect(() => {
    UseAxios.get(`/follows/list/${id}`).then(res => {
      setFollowData(res.data);
      console.log('팔로우' + followData)
      console.log('페이지 주인' + id)
    });
  }, []);


  const ItemView = ({item}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', flex: 1.5, margin: '2%'}}
            navigation={navigation}
            onPress={() =>
              navigation.navigate('yourPageScreen', {id: item.userId})}>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center', }}>
              <Image
                source={{uri: item.img}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: 'rgba(255,90,110,1)', }}
              />
            </View>
            <View style={{flex: 1, alignSelf: 'flex-start', paddingVertical: '5%'}}>
              <Text style={styles.userNickname}>{item.nickname}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>
                  {(() => {
                    if (item.genderCode === 'G0101') return <Text>남성</Text>;
                    else return <Text>여성</Text>;
                  })()}{' '}
                  /
                  {(() => {
                    if (item.mbti1Code === 'M0101') return <Text> E</Text>;
                    else return <Text> I</Text>;
                  })()}
                  {(() => {
                    if (item.mbti2Code === 'M0201') return <Text>N</Text>;
                    else return <Text>S</Text>;
                  })()}
                  {(() => {
                    if (item.mbti3Code === 'M0301') return <Text>F</Text>;
                    else return <Text>T</Text>;
                  })()}
                  {(() => {
                    if (item.mbti4Code === 'M0401') return <Text>P</Text>;
                    else return <Text>J</Text>;
                  })()}{' '}
                  /
                  {(() => {
                    if (item.ageRangeCode === 'A0101')
                      return <Text> 10대 미만</Text>;
                    else if (item.ageRangeCode === 'A0102')
                      return <Text> 10대</Text>;
                    else if (item.ageRangeCode === 'A0103')
                      return <Text> 20대</Text>;
                    else if (item.ageRangeCode === 'A0104')
                      return <Text> 30대</Text>;
                    else if (item.ageRangeCode === 'A0104')
                      return <Text> 40대</Text>;
                    else return <Text> 50대 이상</Text>;
                  })()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          style={{flex: 0.5, justifyContent: 'center', borderWidth: 1}}>
            <Text style={{textAlign: 'center'}}> 팔로우</Text>
          </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}></View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <FlatList
          style={{}}
          navigation={navigation}
          data={followData.followers}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}></FlatList>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  userNickname: {
    fontWeight: 'bold',
  },
  userInfo: {
    paddingTop: '1%',
    paddingRight: '1%',
  },
  textInputStyle: {
    height: 45,
    borderWidth: 1,
    paddingLeft: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
export default FollowerScreen;
