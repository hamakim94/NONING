import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {Controller} from 'react-hook-form';
import UseAxios from '../../util/UseAxios';
import UserContext from '../../util/UserContext';

function CheckInput({
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
  edit,
  placeholder,
}) {
  const blank = /\s/g;
  const {userData} = useContext(UserContext);
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
              ref={(el) => (inputRef.current[index] = el)}
              onFocus={() => setStyle(styles.checkFocusInput)}
              onBlur={() => setStyle(styles.checkBlurInput)}
              onChangeText={(value) => [
                onChange(value.replace(blank, '')),
                setCheck(false),
              ]}
              value={value}
              returnKeyType="next"
              onSubmitEditing={() =>
                inputRef.current.length == index + 1
                  ? inputRef.current[index].focus()
                  : inputRef.current[index + 1].focus()
              }
              selectionColor={'#FF7171'}
              autoFocus={index == 0 ? true : false}
              placeholder={placeholder}
            />
            <TouchableOpacity
              style={
                Check ? styles.confirmTrueButton : styles.confirmFalseButton
              }
              onPress={() => {
                errorMessage === '' && value !== ''
                  ? property == 'email'
                    ? UseAxios.post('/users/duplications/check', null, {
                        params: {
                          email: value,
                        },
                      })
                        .then(() => {
                          alert('확인되었습니다.');
                          setCheck(true);
                        })
                        .catch(() => {
                          alert('사용 중인 이메일입니다.');
                          setCheck(false);
                        })
                    : edit
                    ? value === !userData.nickname
                      ? UseAxios.post('/users/duplications/check', null, {
                          params: {
                            nickname: value,
                          },
                        })
                          .then(() => {
                            alert('확인되었습니다.');
                            setCheck(true);
                          })
                          .catch(() => {
                            alert('사용 중인 별명입니다.');
                            setCheck(false);
                          })
                      : setCheck(true)
                    : UseAxios.post('/users/duplications/check', null, {
                        params: {
                          nickname: value,
                        },
                      })
                        .then(() => {
                          alert('확인되었습니다.');
                          setCheck(true);
                        })
                        .catch(() => {
                          alert('사용 중인 별명입니다.');
                          setCheck(false);
                        })
                  : alert('올바르지 않은 형식입니다.');
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

export default React.memo(CheckInput);
