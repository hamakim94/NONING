import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Avatar} from '@rneui/themed';

function ProfileEditScreen() {
  const inputRef = useRef([]);
  const [emailStyle, setEmailStyle] = useState(styles.checkBlurInput);
  const [pwStyle, setPwStyle] = useState(styles.blurInput);
  const [pwConfirmStyle, setPwConfirmStyle] = useState(styles.blurInput);
  const [nicknameStyle, setNicknameStyle] = useState(styles.checkBlurInput);
  const [nameStyle, setNameStyle] = useState(styles.blurInput);
  const [maleCheckBox, setMaleCheckBox] = useState(false);
  const [femaleCheckBox, setFemaleCheckBox] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const ageGroup = ['10대', '20대', '30대', '40대', '50대이상'];
  const MbtiGroup = [
    'ENFJ',
    'ENFP',
    'ENTJ',
    'ENTP',
    'ESFJ',
    'ESFP',
    'ESTJ',
    'ESTP',
    'INFJ',
    'INFP',
    'INTJ',
    'INTP',
    'ISFJ',
    'ISFP',
    'ISTJ',
    'ISTP',
  ];

  const schema = yup.object({
    email: yup
      .string()
      .email('이메일 형식을 사용하세요.')
      .required('필수 항목입니다.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
        '8~16자 영문, 숫자, 특수문자를 사용하세요.',
      )
      .required('필수 항목입니다.'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않았습니다.')
      .required('필수 항목입니다.'),
    nickname: yup
      .string()
      .min(2, '2~12자 닉네임을 사용하세요.')
      .max(12, '2~12자 닉네임을 사용하세요.')
      .required('필수 항목입니다.'),
    name: yup.string().required('필수 항목입니다.'),
    gender: yup.string().required('필수 항목입니다.'),
    mbti: yup.string().required('필수 항목입니다.'),
    age: yup.string().required('필수 항목입니다.'),
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      name: '',
      gender: '',
      mbti: '',
      age: '',
    },
    resolver: yupResolver(schema),
  });

  const blank = /\s/g;

  const onSubmit = data => {
    console.log(data);
  };

  console.log(errors);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>닉네임</Text>
          <Text style={styles.labelStar}>*</Text>
        </View>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={nicknameStyle}
                blurOnSubmit={false}
                ref={el => (inputRef.current[3] = el)}
                onFocus={() => setNicknameStyle(styles.checkFocusInput)}
                onBlur={() => setNicknameStyle(styles.checkBlurInput)}
                onChangeText={value => onChange(value.replace(blank, ''))}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => inputRef.current[4].focus()}
              />
              <TouchableOpacity
                style={
                  nickNameCheck
                    ? styles.confirmTrueButton
                    : styles.confirmFalseButton
                }
                onPress={() => setNickNameCheck(true)}>
                <Text style={styles.confirmText}>중복확인</Text>
              </TouchableOpacity>
            </View>
          )}
          name="nickname"
        />
        {errors.nickname ? (
          <Text style={styles.errorText}>{errors.nickname.message}</Text>
        ) : (
          <Text style={styles.errorText}></Text>
        )}
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 4}}>
            <View>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>성별</Text>
                <Text style={styles.labelStar}>*</Text>
              </View>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      disabled={false}
                      value={maleCheckBox}
                      onValueChange={newValue =>
                        femaleCheckBox
                          ? [
                              setMaleCheckBox(newValue),
                              setFemaleCheckBox(!femaleCheckBox),
                              newValue ? onChange('남성') : onChange('여성'),
                            ]
                          : [
                              setMaleCheckBox(newValue),
                              newValue ? onChange('남성') : onChange(''),
                            ]
                      }
                      tintColors={{true: '#FF7171'}}
                    />
                    <Text
                      style={{
                        textAlignVertical: 'center',
                        fontSize: 12,
                        paddingBottom: 1,
                        color: 'black',
                      }}>
                      남성
                    </Text>
                    <CheckBox
                      disabled={false}
                      value={femaleCheckBox}
                      onValueChange={newValue =>
                        maleCheckBox
                          ? [
                              setMaleCheckBox(!maleCheckBox),
                              setFemaleCheckBox(newValue),
                              newValue ? onChange('여성') : onChange('남성'),
                            ]
                          : [
                              setFemaleCheckBox(newValue),
                              newValue ? onChange('여성') : onChange(''),
                            ]
                      }
                      tintColors={{true: '#FF7171'}}
                    />
                    <Text
                      style={{
                        textAlignVertical: 'center',
                        fontSize: 12,
                        paddingBottom: 1,
                        color: 'black',
                      }}>
                      여성
                    </Text>
                  </View>
                )}
                name="gender"
              />
              {errors.gender ? (
                <Text style={styles.errorText}>{errors.gender.message}</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
            <View>
              <View>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>MBTI</Text>
                  <Text style={styles.labelStar}>*</Text>
                </View>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View style={{flexDirection: 'row'}}>
                      <SelectDropdown
                        data={MbtiGroup}
                        defaultButtonText="SELECT"
                        renderDropdownIcon={isOpened => {
                          return (
                            <FontAwesome
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              color={'#444'}
                              size={18}
                            />
                          );
                        }}
                        rowStyle={{
                          backgroundColor: 'white',
                        }}
                        dropdownStyle={{
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderRadius: 6,
                          borderColor: '#808080',
                        }}
                        buttonStyle={{
                          width: '75%',
                          height: 35,
                          backgroundColor: 'white',
                          borderWidth: 1,
                          borderRadius: 6,
                          borderColor: '#808080',
                        }}
                        buttonTextStyle={{
                          fontSize: 16,
                          textAlign: 'left',
                        }}
                        onSelect={selectedItem => {
                          onChange(selectedItem);
                        }}
                        buttonTextAfterSelection={selectedItem => {
                          return selectedItem;
                        }}
                        rowTextForSelection={item => {
                          return item;
                        }}
                      />
                    </View>
                  )}
                  name="mbti"
                />
                {errors.mbti ? (
                  <Text style={styles.errorText}>{errors.mbti.message}</Text>
                ) : (
                  <Text style={styles.errorText}></Text>
                )}
              </View>
            </View>
            <View>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>연령대</Text>
                <Text style={styles.labelStar}>*</Text>
              </View>
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <View style={{flexDirection: 'row'}}>
                    <SelectDropdown
                      data={ageGroup}
                      rowStyle={{
                        backgroundColor: 'white',
                      }}
                      defaultButtonText="SELECT"
                      dropdownStyle={{
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: '#808080',
                      }}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      buttonStyle={{
                        width: '75%',
                        height: 35,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: '#808080',
                      }}
                      buttonTextStyle={{
                        fontSize: 16,
                        textAlign: 'left',
                      }}
                      onSelect={selectedItem => {
                        onChange(selectedItem);
                      }}
                      buttonTextAfterSelection={selectedItem => {
                        return selectedItem;
                      }}
                      rowTextForSelection={item => {
                        return item;
                      }}
                    />
                  </View>
                )}
                name="age"
              />
              {errors.age ? (
                <Text style={styles.errorText}>{errors.age.message}</Text>
              ) : (
                <Text style={styles.errorText}></Text>
              )}
            </View>
          </View>
          <View
            style={{
              flex: 6,
              marginTop: '15%',
              alignItems: 'center',
            }}>
            <View>
              <Text style={[styles.label, {marginBottom: '10%'}]}>
                프로필 이미지
              </Text>
            </View>
            <TouchableOpacity>
              <Avatar
                size={110}
                rounded
                title="+"
                titleStyle={{color: '#808080'}}
                containerStyle={{
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderColor: '#808080',
                }}></Avatar>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: '3%'}}>
          <TouchableOpacity
            style={
              Object.keys(errors).length ? styles.button : styles.checkButton
            }
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'black',
    textAlignVertical: 'bottom',
    marginLeft: '1%',
    fontWeight: 'bold',
  },
  labelStar: {
    color: '#FF7171',
    textAlignVertical: 'top',
    paddingBottom: '1%',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '1.5%',
  },
  button: {
    marginBottom: '5%',
    width: '23%',
    color: 'white',
    height: '21%',
    backgroundColor: '#808080',
    borderRadius: 6,
    justifyContent: 'center',
  },
  checkButton: {
    marginBottom: '5%',
    width: '23%',
    color: 'white',
    height: '21%',
    backgroundColor: '#FF7171',
    borderRadius: 6,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  focusInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  blurInput: {
    width: '100%',
    borderColor: '#808080',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },
  checkFocusInput: {
    width: '75%',
    backgroundColor: 'white',
    borderColor: 'black',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  checkBlurInput: {
    width: '75%',
    borderColor: '#808080',
    height: '100%',
    paddingVertical: 0,
    paddingHorizontal: '2%',
    borderRadius: 4,
    borderWidth: 1,
  },
  confirmFalseButton: {
    paddingVertical: '1%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#808080',
    marginHorizontal: '3%',
    width: '22%',
  },
  confirmTrueButton: {
    paddingVertical: '1%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#FF7171',
    marginHorizontal: '3%',
    width: '22%',
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    color: '#FF7171',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: '1%',
    marginVertical: 2,
  },
});

export default ProfileEditScreen;
