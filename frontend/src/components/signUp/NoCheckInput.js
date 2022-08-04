import {Text, View, TextInput} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

function NoCheckInput({
  control,
  style,
  setStyle,
  property,
  styles,
  inputRef,
  errorMessage,
  index,
  blind,
  login,
  handleSubmit,
  onSubmit,
}) {
  const blank = /\s/g;
  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              returnKeyType={login ? '' : 'next'}
              onSubmitEditing={
                login
                  ? handleSubmit(onSubmit)
                  : () =>
                      inputRef.current.length == index + 1
                        ? inputRef.current[index].focus()
                        : inputRef.current[index + 1].focus()
              }
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

export default React.memo(NoCheckInput);
