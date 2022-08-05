import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function AnalysisList({info}) {
  return (
    <View style={{flex: 1}}>
      {info.total > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 0.3,
            borderBottomColor: '#808080',
            paddingBottom: '4%',
            marginTop: '4.3%',
          }}>
          <View style={{flex: 1, paddingLeft: '7%', paddingTop: '1%'}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{info.name}</Text>
          </View>
          <View style={{flex: 5, paddingHorizontal: '5%'}}>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 2,
                borderRadius: 3,
                height: '110%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 6 * (info.opt1 / info.total),
                  borderRightWidth: 1,
                  backgroundColor: '#FF5F5F',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginLeft: 7,
                    marginTop: 2,
                  }}>
                  {Math.round((info.opt1 / info.total) * 100)}%
                </Text>
              </View>
              <View
                style={{
                  flex: 6 - 6 * (info.opt1 / info.total),
                  borderLeftWidth: 1,
                  backgroundColor: '#49D3CA',
                  width: '100%',
                  height: '100%',
                }}>
                <Text
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    marginRight: 7,
                    marginTop: 2,
                  }}>
                  {100 - Math.round((info.opt1 / info.total) * 100)}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default AnalysisList;
