import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import axios from 'axios';

export default function CheckInput({
  control,
  style,
  setStyle,
  property,
  Check,
  setCheck,
  styles,
  inputRef,
  errorMessage,
  index,
}) {
  const blank = /\s/g;

  return (
    <>
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
              onFocus={() => setStyle(styles.checkFocusInput)}
              onBlur={() => setStyle(styles.checkBlurInput)}
              onChangeText={value => onChange(value.replace(blank, ''))}
              value={value}
              returnKeyType="next"
              onSubmitEditing={() => inputRef.current[index + 1].focus()}
              selectionColor={'#FF7171'}
            />
            <TouchableOpacity
              style={
                Check ? styles.confirmTrueButton : styles.confirmFalseButton
              }
              onPress={() => {
                property == 'email'
                  ? axios({
                      url: `http://10.0.2.2:9999/api/signin`,
                      method: 'GET',
                      params: {email: value},
                    })
                      .then(res => {
                        console.log(res);
                        alert('확인되었습니다.');
                        setCheck(true);
                      })
                      .catch(err => {
                        console.log(err);
                        alert('사용 중인 이메일입니다.');
                        setCheck(false);
                      })
                  : axios({
                      url: `http://10.0.2.2:9999/api/signin`,
                      method: 'GET',
                      params: {nickname: value},
                    })
                      .then(res => {
                        console.log(res.data);
                        alert('확인되었습니다.');
                        setCheck(true);
                      })
                      .catch(err => {
                        console.log(err);
                        alert('사용 중인 별명입니다.');
                        setCheck(false);
                      });
              }}>
              <Text style={styles.confirmText}>중복확인</Text>
            </TouchableOpacity>
          </View>
        )}
        name={property}
      />
      <Text style={styles.errorText}>{errorMessage}</Text>
    </>
  );
}
