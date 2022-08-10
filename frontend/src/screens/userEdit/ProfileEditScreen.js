import React, {useState, useRef, useContext} from 'react';
import {View, TouchableOpacity, Platform, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import schema from '../../components/signUp/Validation';
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
import schemaNick from '../../components/signUp/ValidationNickname';

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

function ProfileEditScreen({navigation}) {
  const inputRef = useRef([]);
  const {userData, setUserData} = useContext(UserContext);
  const [nicknameStyle, setNicknameStyle] = useState(styles.checkBlurInput);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [imgSource, setImageSource] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: '',
    },
    resolver: yupResolver(schemaNick),
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
      mbti1Code: userData.mbti1Code,
      mbti2Code: userData.mbti2Code,
      mbti3Code: userData.mbti3Code,
      mbti4Code: userData.mbti4Code,
      age: userData.age,
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

        <View style={{alignItems: 'center', marginVertical: '3%'}}>
          <TouchableOpacity
            style={
              Object.keys(errors).length === 0 && nickNameCheck
                ? styles.checkButton2
                : styles.button2
            }
            onPress={
              Object.keys(errors).length === 0 && nickNameCheck
                ? handleSubmit(onSubmit)
                : () => {
                    alert('입력을 확인해주세요.');
                  }
            }>
            <Text style={styles.buttonText}>변경하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default ProfileEditScreen;
