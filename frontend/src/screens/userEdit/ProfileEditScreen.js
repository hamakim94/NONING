import React, {useState, useRef, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Avatar} from '@rneui/themed';
import InputLabel from '../../components/signUp/InputLabel';
import CheckInput from '../../components/signUp/CheckInput';
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
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
      img: data.img,
      genderCode: userData.genderCode,
      mbti1Code: data.mbti1Code,
      mbti2Code: data.mbti2Code,
      mbti3Code: data.mbti3Code,
      mbti4Code: data.mbti4Code,
      age: data.age,
    };
    formdata.append('userDTO', JSON.stringify(newData));

    // console.log(formdata);
    UseAxios.put('/users/profiles/edit', formdata, {
      headers: {'Content-Type': `multipart/form-data;charset=UTF-8`},
    })
      .then((res) => {
        setUserData(res.data);
      })
      .then(() => navigation.goBack())
      .catch((err) => {
        // console.log(err);
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

  const uriImg = imgSource
    ? imgSource
    : userData.img
    ? {uri: userData.writerImg}
    : require('../../assets/DefaultProfile.jpg');
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
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
            source={
              imgSource
                ? {
                    uri: imgSource,
                  }
                : userData.img
                ? {uri: userData.img}
                : require('../../assets/DefaultProfile.jpg')
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.nicknameContainer}>
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
          edit={true}
          index={0}></CheckInput>
      </View>
      <View style={styles.mbtiNameContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
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
                  Alert.alert('', '입력을 확인해주세요.');
                }
          }>
          <View
            style={
              Object.keys(errors).length === 0 && nickNameCheck
                ? styles.checkButton
                : styles.button
            }>
            <Text style={styles.buttonText}>변경</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    position: 'absolute',
    top: 10,
    left: screenWidth / 2 - 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknameContainer: {
    position: 'absolute',
    top: 140,
    left: 16,
    right: 16,
  },
  mbtiNameContainer: {
    position: 'absolute',
    top: 215,
    left: 16,
    right: 16,
  },
  buttonContainer: {
    position: 'absolute',
    top: 250,
    height: 110,
    left: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    color: '#FFFFFF',
    height: 30,
    backgroundColor: '#808080',
    borderRadius: 6,
    justifyContent: 'center',
  },
  checkButton: {
    width: '100%',
    height: 30,
    color: '#FFFFFF',
    backgroundColor: '#FF5F5F',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  focusInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
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
  focusHalfInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    paddingVertical: 0,
    paddingHorizontal: '4%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1.5,
  },
  blurHalfInput: {
    width: '100%',
    borderColor: '#808080',
    paddingVertical: 0,
    paddingHorizontal: '4%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
  },
  checkFocusInput: {
    width: '75%',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
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
    backgroundColor: '#FF5F5F',
    marginHorizontal: '3%',
    width: '22%',
  },
  confirmText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  errorText: {
    color: '#FF7171',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: '1%',
    marginVertical: 2,
  },
  checkBoxText: {
    textAlignVertical: 'center',
    fontSize: 12,
    paddingBottom: 1,
    color: '#000000',
  },
  dropDownOpen: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#808080',
  },
  dropDownButton: {
    width: '75%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#808080',
  },
});
export default ProfileEditScreen;
