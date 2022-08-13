import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';

function AnalysisList({info, myData}) {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={styles.leftContainer}>
          <Text
            style={[
              styles.leftText,
              myData.includes(info.name) ? {color: '#FF5F5F'} : '',
            ]}>
            {info.name}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          {info.total > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 2,
                borderRadius: 3,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 6.001 * (info.opt1 / info.total),
                  // borderRightWidth: 1,
                  backgroundColor: '#FF5F5F',
                  justifyContent: 'center',
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
                  flex: 6.001 - 6 * (info.opt1 / info.total),
                  // borderLeftWidth: 1,
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
                  {100 - Math.round((info.opt1 / info.total) * 100) > 14
                    ? 100 - Math.round((info.opt1 / info.total) * 100) + '%'
                    : ''}
                </Text>
              </View>
            </View>
          ) : (
            <Text>참여자가 존재하지 않습니다.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barRightText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 7,
    marginTop: 2,
  },
  barLeftText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 7,
    marginTop: 2,
  },
  container: {
    flex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: '#808080',
    paddingBottom: '4%',
    marginTop: '4.3%',
  },
  leftContainer: {
    flex: 1.5,
    paddingLeft: '7%',
    paddingTop: '1%',
  },
  rightContainer: {
    flex: 4.5,
    paddingHorizontal: '5%',
  },
  leftText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  mainBar: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 3,
    height: '110%',
    justifyContent: 'center',
  },
});

export default AnalysisList;
