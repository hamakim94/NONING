import React, {useState, useRef, useContext} from 'react';
import {View, TouchableOpacity, Platform, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Avatar} from '@rneui/themed';
import InputLabel from '../../components/signUp/InputLabel';
import CheckInput from '../../components/signUp/CheckInput';
import styles from '../../components/signUp/InfoStyles';
import ImagePicker from 'react-native-image-crop-picker';
import UploadModeModal from '../../components/signUp/UploadModeModal';
import UseAxios from '../../util/UseAxios';
import mime from 'mime';
import UserContext from '../../util/UserContext';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NoCheckInput from '../../components/signUp/NoCheckInput';
import schemaProfileEdit from '../../components/signUp/ValidationProfile';

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

function ProfileEditScreen({navigation}) {
  const inputRef = useRef([]);
  const {userData, setUserData} = useContext(UserContext);
  const [nicknameStyle, setNicknameStyle] = useState(styles.checkBlurInput);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [imgSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ageStyle, setAgeStyle] = useState(styles.blurHalfInput);
  // mbti 추가하기
  // 나이 수정하기
  const {
    handleSubmit,
    control,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      gender: '',
      mbti: '',
      mbti1Code: '',
      mbti2Code: '',
      mbti3Code: '',
      mbti4Code: '',
      age: '',
    },
    resolver: yupResolver(schemaProfileEdit),
  });

  const onSubmit = (data) => {
    const formdata = new FormData();
    const filename = imgSource !== null ? imgSource.split('/').pop() : null;
    const imgData = {
      uri: imgSource,
      type: mime.getType(imgSource),
      name: filename,
    };
    imgSource !== null ? formdata.append('image', imgData) : null;
    const newData = {
      userId: userData.userId,
      nickname: data.nickname,
      img: userData.img,
      genderCode: userData.genderCode,
      mbti1Code: data.mbti1Code,
      mbti2Code: data.mbti2Code,
      mbti3Code: data.mbti3Code,
      mbti4Code: data.mbti4Code,
      age: data.age,
    };
    formdata.append('userDTO', JSON.stringify(newData));

    console.log(formdata);
    UseAxios.put('/users/profiles/edit', formdata, {
      headers: {'Content-Type': `multipart/form-data;charset=UTF-8`},
    })
      .then((res) => {
        setUserData(res.data);
      })
      .then(() => navigation.goBack())
      .catch((err) => {
        console.log(err);
      });
  };

  const onLaunchCamera = () => {
    ImagePicker.openCamera(imagePickerOption)
      .then((image) => {
        setImageSource(image.path);
      })
      .catch((err) => {});
  };
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    ImagePicker.openPicker(imagePickerOption)
      .then((image) => {
        setImageSource(image.path);
      })
      .catch((err) => {});
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
            justifyContent: 'center',
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
                backgroundColor: '#FFFFFF',
                borderWidth: 2,
                borderColor: '#808080',
                marginBottom: '5%',
              }}
              source={{
                uri: imgSource ? imgSource : userData.img,
              }}
            />
          </TouchableOpacity>
        </View>
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
          index={0}></CheckInput>

        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <InputLabel name="MBTI" star="*"></InputLabel>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <View style={{flexDirection: 'row'}}>
                  <SelectDropdown
                    data={MbtiGroup}
                    defaultButtonText="SELECT"
                    renderDropdownIcon={(isOpened) => {
                      return (
                        <FontAwesome
                          name={isOpened ? 'chevron-up' : 'chevron-down'}
                          color={'#444'}
                          size={18}
                        />
                      );
                    }}
                    rowStyle={{
                      backgroundColor: '#FFFFFF',
                    }}
                    dropdownStyle={styles.dropDownOpen}
                    buttonStyle={styles.dropDownButton}
                    buttonTextStyle={{
                      fontSize: 16,
                      textAlign: 'left',
                    }}
                    onSelect={(selectedItem) => {
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
                    buttonTextAfterSelection={(selectedItem) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item) => {
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
          <View style={{flex: 1}}>
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
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={
              Object.keys(errors).length === 0 && nickNameCheck
                ? styles.checkButton
                : styles.button
            }
            onPress={
              Object.keys(errors).length === 0 && nickNameCheck
                ? handleSubmit(onSubmit)
                : () => {
                    alert('입력을 확인해주세요.');
                  }
            }>
            <View
              style={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.buttonText}>변경</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default ProfileEditScreen;
