import React, {useState, useRef} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import schema from '../../components/signUp/Validation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Avatar} from '@rneui/themed';
import InputLabel from '../../components/signUp/InputLabel';
import CheckInput from '../../components/signUp/CheckInput';
import NoCheckInput from '../../components/signUp/NoCheckInput';
import styles from '../../components/signUp/InfoStyles';
import axios from 'axios';

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

function InfoScreen() {
  const inputRef = useRef([]);
  const [emailStyle, setEmailStyle] = useState(styles.checkBlurInput);
  const [pwStyle, setPwStyle] = useState(styles.blurInput);
  const [pwConfirmStyle, setPwConfirmStyle] = useState(styles.blurInput);
  const [nicknameStyle, setNicknameStyle] = useState(styles.checkBlurInput);
  const [nameStyle, setNameStyle] = useState(styles.blurHalfInput);
  const [ageStyle, setAgeStyle] = useState(styles.blurHalfInput);
  const [maleCheckBox, setMaleCheckBox] = useState(false);
  const [femaleCheckBox, setFemaleCheckBox] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);

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

  const onSubmit = data => {
    axios({
      url: `http://i7a202.p.ssafy.io:9999/api/users/signup`,
      method: 'POST',
      data: {
        age: data.age,
        email: data.email,
        genderCode: 'G0101',
        img: '이미지123',
        mbti1Code: 'M0101',
        mbti2Code: 'M0201',
        mbti3Code: 'M0301',
        mbti4Code: 'M0401',
        nickname: data.nickname,
        password: data.password,
      },
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <InputLabel name="프로필 이미지" star=""></InputLabel>
          <TouchableOpacity>
            <Avatar
              size={100}
              rounded
              containerStyle={{
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: '#808080',
                marginBottom: '5%',
              }}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
                // https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_960_720.jpg
              }}
            />
          </TouchableOpacity>
        </View>
        <InputLabel name="이메일" star="*"></InputLabel>
        <CheckInput
          control={control}
          style={emailStyle}
          setStyle={setEmailStyle}
          property="email"
          Check={emailCheck}
          setCheck={setEmailCheck}
          errorMessage={errors.email ? errors.email.message : ''}
          styles={styles}
          inputRef={inputRef}
          index={0}></CheckInput>
        <InputLabel name="비밀번호" star="*"></InputLabel>
        <NoCheckInput
          control={control}
          style={pwStyle}
          setStyle={setPwStyle}
          property="password"
          errorMessage={errors.password ? errors.password.message : ''}
          styles={styles}
          inputRef={inputRef}
          index={1}
          blind={true}></NoCheckInput>
        <NoCheckInput
          control={control}
          style={pwConfirmStyle}
          setStyle={setPwConfirmStyle}
          property="passwordConfirm"
          errorMessage={
            errors.passwordConfirm ? errors.passwordConfirm.message : ''
          }
          styles={styles}
          inputRef={inputRef}
          index={2}
          blind={true}></NoCheckInput>
        <InputLabel name="닉네임" star="*"></InputLabel>
        <CheckInput
          control={control}
          style={nicknameStyle}
          setStyle={setNicknameStyle}
          property="nickname"
          Check={nickNameCheck}
          setCheck={setNickNameCheck}
          errorMessage={errors.nickname ? errors.nickname.message : ''}
          styles={styles}
          inputRef={inputRef}
          index={3}></CheckInput>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <InputLabel name="이름" star="*"></InputLabel>
            <NoCheckInput
              control={control}
              style={nameStyle}
              setStyle={setNameStyle}
              property="name"
              errorMessage={errors.name ? errors.name.message : ''}
              styles={styles}
              inputRef={inputRef}
              index={4}></NoCheckInput>
            <InputLabel name="나이" star="*"></InputLabel>
            <NoCheckInput
              control={control}
              style={ageStyle}
              setStyle={setAgeStyle}
              property="age"
              errorMessage={errors.age ? errors.age.message : ''}
              styles={styles}
              inputRef={inputRef}
              index={5}></NoCheckInput>
          </View>
          <View style={{flex: 1, paddingLeft: '15%'}}>
            <InputLabel name="성별" star="*"></InputLabel>
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
                  <Text style={styles.checkBoxText}>남성</Text>
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
                  <Text style={styles.checkBoxText}>여성</Text>
                </View>
              )}
              name="gender"
            />
            {errors.gender ? (
              <Text style={styles.errorText}>{errors.gender.message}</Text>
            ) : (
              <Text style={styles.errorText} />
            )}
            <InputLabel name="MBTI" star="*"></InputLabel>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
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
                    dropdownStyle={styles.dropDownOpen}
                    buttonStyle={styles.dropDownButton}
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
              <Text style={styles.errorText} />
            )}
          </View>
        </View>
        <View style={{alignItems: 'center', marginVertical: '3%'}}>
          <TouchableOpacity
            style={
              Object.keys(errors).length > 0 && emailCheck && nickNameCheck
                ? styles.checkButton
                : styles.button
            }
            onPress={
              Object.keys(errors).length > 0 && emailCheck && nickNameCheck
                ? console.log('정보확인')
                : handleSubmit(onSubmit)
            }>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default InfoScreen;
