import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function AnalysisList({info}) {
  return (
    <View style={styles.container}>
      {info.total > 0 ? (
        <View style={styles.barContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.leftText}>{info.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.mainBar}>
              <View style={barStyles(info.opt1, info.total).leftBar}>
                <Text style={styles.barLeftText}>
                  {Math.round((info.opt1 / info.total) * 100)}%
                </Text>
              </View>
              <View style={barStyles(info.opt1, info.total).rightBar}>
                <Text style={styles.barRightText}>
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
    flex: 1,
    paddingLeft: '7%',
    paddingTop: '1%',
  },
  rightContainer: {
    flex: 5,
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

const barStyles = (opt1, total) =>
  StyleSheet.create({
    leftBar: {
      flex: 6 * (opt1 / total),
      borderRightWidth: 2,
      backgroundColor: '#FF5F5F',
      borderBottomLeftRadius: 1,
      borderTopLeftRadius: 1,
      width: '100%',
    },
    rightBar: {
      flex: 6 - 6 * (opt1 / total),
      backgroundColor: '#49D3CA',
      borderBottomRightRadius: 1,
      borderTopRightRadius: 1,
      width: '100%',
    },
  });

export default AnalysisList;
