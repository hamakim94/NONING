import React from 'react';
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
            <>
              <View style={styles.barLeftContainer(info)}>
                <Text style={styles.barLeftText} numberOfLines={1}>
                  {Math.round((info.opt1 / info.total) * 100)}%
                </Text>
              </View>
              <View style={styles.barRightContainer(info)}>
                <Text style={styles.barRightText} numberOfLines={1}>
                  {Math.round((info.opt2 / info.total) * 100)}%
                </Text>
              </View>
            </>
          ) : (
            <Text>참여자 정보가 존재하지 않습니다.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#A6A6A6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%',
  },
  leftContainer: {
    flex: 1.5,
    paddingLeft: '7%',
  },
  rightContainer: {
    flex: 4.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    paddingHorizontal: '2%',
  },
  leftText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  barLeftContainer: (info) => ({
    width: (info.opt1 / (info.opt1 + info.opt2)) * 100 + '%',
    height: 30,
    borderWidth: info.opt1 / (info.opt1 + info.opt2) == 0 ? 0 : 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRadius: info.opt1 / (info.opt1 + info.opt2) == 1 ? 5 : 0,
    backgroundColor: 'rgba(255,95,95,1)',
    justifyContent: 'center',
  }),
  barRightContainer: (info) => ({
    width: (info.opt2 / (info.opt1 + info.opt2)) * 100 + '%',
    height: 30,
    borderWidth: info.opt2 / (info.opt1 + info.opt2) == 0 ? 0 : 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderRadius: info.opt2 / (info.opt1 + info.opt2) == 1 ? 5 : 0,
    backgroundColor: 'rgba(73, 211, 202,1)',
    justifyContent: 'center',
  }),

  barLeftText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 7,
  },
  barRightText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 7,
  },
});

export default AnalysisList;
