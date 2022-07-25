import {StyleSheet, ScrollView, View} from 'react-native';
import TosText from '../../components/common/TosText';
import React from 'react';

export default function TosScreen() {
  return (
    <View>
      <ScrollView>
        <TosText />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
