import {Text, View, TextInput} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

export default function NoCheckInput({
  control,
  style,
  setStyle,
  property,
  styles,
  inputRef,
  errorMessage,
  index,
  blind,
}) {
  const blank = /\s/g;
  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={[
                style,
                {
                  borderColor:
                    Object.keys(errorMessage).length == 0
                      ? style.borderColor
                      : '#FF7171',
                },
              ]}
              blurOnSubmit={false}
              ref={el => (inputRef.current[index] = el)}
              onFocus={() =>
                index < 3
                  ? setStyle(styles.focusInput)
                  : setStyle(styles.focusHalfInput)
              }
              onBlur={() =>
                index < 3
                  ? setStyle(styles.blurInput)
                  : setStyle(styles.blurHalfInput)
              }
              onChangeText={value => onChange(value.replace(blank, ''))}
              value={value}
              returnKeyType="next"
              onSubmitEditing={() => inputRef.current[index + 1].focus()}
              secureTextEntry={blind}
              selectionColor={'#FF7171'}
            />
          </View>
        )}
        name={property}
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
}
