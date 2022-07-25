import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Input} from '@rneui/themed';

export default function StarInput({name, property}) {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>{name}</Text>
        <Text style={styles.labelStar}>*</Text>
      </View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value.replace(blank, ''))}
            value={value}
          />
        )}
        name={property}
      />
      {property.email && <Text>{errors.property.message}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'black',
    textAlignVertical: 'bottom',
    fontWeight: 'bold',
  },
  labelStar: {
    color: '#FF7171',
    textAlignVertical: 'top',
    paddingBottom: '1%',
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    padding: 8,
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#808080',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
