import {StyleSheet, ScrollView, View} from 'react-native';
import PrivacyText from '../../components/common/PrivacyText';
import React from 'react';

export default function PrivacyScreen() {
  return (
    <View>
      <ScrollView>
        <PrivacyText />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
