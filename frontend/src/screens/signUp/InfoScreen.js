import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Platform, Text} from 'react-native';
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
import ImagePicker from 'react-native-image-crop-picker';
import UploadModeModal from '../../components/signUp/UploadModeModal';
import UseAxios from '../../util/UseAxios';

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

const imagePickerOption = {
  width: 100,
  height: 100,
  cropping: true,
  cropperCircleOverlay: true,
  showCropGuidelines: false,
  enableRotationGesture: true,
  freeStyleCropEnabled: true,
  includeBase64: Platform.OS === 'android',
  hideBottomControls: true,
};

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
  const [imgSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const filename = imgSource !== null ? imgSource.split('/').pop() : '';
  const match = /\.(\w+)%/.exec(filename ?? '');
  const type = match ? `image/${match[1]}` : `image`;
  const formdata = new FormData();
  const {
    handleSubmit,
    control,
    setValue,
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
      mbti1Code: '',
      mbti2Code: '',
      mbti3Code: '',
      mbti4Code: '',
      age: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    formdata.append('image', {uri: imgSource, name: filename, type});
    formdata.append('email', data.email);
    formdata.append('password', data.password);
    formdata.append('nickname', data.nickname);
    formdata.append('name', data.name);
    formdata.append('img', '이거때매오류나요');
    formdata.append('genderCode', data.gender);
    formdata.append('mbti1Code', data.mbti1Code);
    formdata.append('mbti2Code', data.mbti2Code);
    formdata.append('mbti3Code', data.mbti3Code);
    formdata.append('mbti4Code', data.mbti4Code);
    formdata.append('age', data.age);
    UseAxios.post('/users/signup', formdata, {
      headers: {'content-type': 'multipart/form-data'},
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera(imagePickerOption)
      .then(image => {
        setImageSource(image.path);
      })
      .catch(err => {});
  };
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    ImagePicker.openPicker(imagePickerOption)
      .then(image => {
        setImageSource(image.path);
      })
      .catch(err => {});
  };

  const modalOpen = () => {
    setModalVisible(true); // visible = true
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <UploadModeModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onLaunchCamera={onLaunchCamera}
            onLaunchImageLibrary={onLaunchImageLibrary}
          />
          <InputLabel name="프로필 이미지" star=""></InputLabel>
          <TouchableOpacity onPress={modalOpen}>
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
                uri: imgSource
                  ? imgSource
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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
                            newValue ? onChange('G0101') : onChange('G0102'),
                          ]
                        : [
                            setMaleCheckBox(newValue),
                            newValue ? onChange('G0101') : onChange(''),
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
                            newValue ? onChange('G0102') : onChange('G0101'),
                          ]
                        : [
                            setFemaleCheckBox(newValue),
                            newValue ? onChange('G0102') : onChange(''),
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
                      onChange(selectedItem),
                        setValue(
                          'mbti1Code',
                          selectedItem[0] == 'E' ? 'M0101' : 'M0102',
                        ),
                        setValue(
                          'mbti2Code',
                          selectedItem[1] == 'N' ? 'M0201' : 'M0202',
                        ),
                        setValue(
                          'mbti3Code',
                          selectedItem[2] == 'F' ? 'M0301' : 'M0302',
                        ),
                        setValue(
                          'mbti4Code',
                          selectedItem[3] == 'J' ? 'M0401' : 'M0402',
                        );
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
              Object.keys(errors).length === 0 && emailCheck && nickNameCheck
                ? styles.checkButton
                : styles.button
            }
            onPress={
              Object.keys(errors).length === 0 && emailCheck && nickNameCheck
                ? handleSubmit(onSubmit)
                : () => {
                    alert('입력을 확인해주세요.');
                  }
            }>
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default InfoScreen;
