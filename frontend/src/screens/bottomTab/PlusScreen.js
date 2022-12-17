import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Divider} from '@rneui/themed';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NoCheckInput from '../../components/signUp/NoCheckInput';
import InputLabel from '../../components/signUp/InputLabel';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import schema from '../../components/board/BoardValidation';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UseAxios from '../../util/UseAxios';
import NoCheckInputText from '../../components/board/NoCheckInputText';
import {useIsFocused} from '@react-navigation/native';

export default function PlusScreen({navigation}) {
  const inputRef = useRef([]);
  const [titleStyle, setTitleStyle] = useState(styles.blurInput);
  const [argu1Style, setArgu1Style] = useState(styles.blurInput);
  const [argu2Style, setArgu2Style] = useState(styles.blurInput);
  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'onchange',
    defaultValues: {
      title: '',
      opt1: '',
      opt2: '',
      categoryCode: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    data.categoryCode = nameToCode[data.categoryCode];
    // console.log(data);
    UseAxios.post(`/boards/write`, data)
      .then(navigation.navigate('HomeStack'))
      .catch((err) => {
        // console.log(err);
      });
    [isFocused];
  };
  const nameToCode = {
    연애: 'B0101',
    병맛: 'B0102',
    음식: 'B0103',
    게임: 'B0104',
    운동: 'B0105',
    학교: 'B0106',
    직장: 'B0107',
    갈등: 'B0108',
    기타: 'B0199',
  };
  const categoryList = [
    '연애',
    '병맛',
    '음식',
    '게임',
    '운동',
    '학교',
    '직장',
    '갈등',
    '기타',
  ];
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{}}>
        {/* 논쟁등록/주의사항*/}
        <View style={{alignItems: 'center', marginTop: '5%'}}>
          <View>
            <Text style={styles.registArgu}>논쟁등록</Text>
          </View>
          <Divider orientation="vertical" />
        </View>

        {/* 논쟁, 1/2안 입력 */}
        <View style={{marginTop: '2.5%'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.warning}>
              ※성별, 지역, 정치 논쟁은 그 내용과 관계없이 삭제됩니다.
            </Text>
          </View>
          <InputLabel name="논쟁" star="*" />
          <NoCheckInputText
            placeholder={'논쟁 제목 : 최소 5자, 최대 20자'}
            control={control}
            style={titleStyle}
            setStyle={setTitleStyle}
            property="title"
            errorMessage={errors.title ? errors.title.message : ''}
            styles={styles}
            inputRef={inputRef}
            index={0}></NoCheckInputText>
          <InputLabel name="1안" star="*" />
          <NoCheckInputText
            placeholder={'1안 : 최대 15자'}
            control={control}
            style={argu1Style}
            setStyle={setArgu1Style}
            property="opt1"
            errorMessage={errors.opt1 ? errors.opt1.message : ''}
            styles={styles}
            inputRef={inputRef}
            index={1}></NoCheckInputText>
          <InputLabel name="2안" star="*" />
          <NoCheckInputText
            placeholder={'2안: 최대 15자'}
            control={control}
            style={argu2Style}
            setStyle={setArgu2Style}
            property="opt2"
            errorMessage={errors.opt2 ? errors.opt2.message : ''}
            styles={styles}
            inputRef={inputRef}
            index={2}></NoCheckInputText>
          {/* 카테고리 */}
          <View>
            <InputLabel name="카테고리" star="*"></InputLabel>
            <Controller
              control={control}
              render={({field: {onChange}}) => (
                <View style={{flexDirection: 'row'}}>
                  <SelectDropdown
                    data={categoryList}
                    defaultButtonText="선택"
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
                      backgroundColor: 'white',
                    }}
                    dropdownStyle={styles.dropDownOpen}
                    buttonStyle={styles.dropDownButton}
                    buttonTextStyle={{
                      fontSize: 16,
                      textAlign: 'left',
                    }}
                    onSelect={(selectedItem) => {
                      onChange(selectedItem);
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
              name="categoryCode"
            />
            {errors.categoryCode ? (
              <Text style={styles.errorText}>
                {errors.categoryCode.message}
              </Text>
            ) : (
              <Text style={styles.errorText} />
            )}
          </View>
        </View>

        {/* 미리보기*/}
        <View style={{}}>
          <Divider orientation="vertical" style={{marginTop: '2.5%'}} />
          <Text style={styles.preview}> PREVIEW </Text>
          <View style={styles.card}>
            <View style={{marginBottom: '2.5%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: '5%',
                }}>
                {getValues('title')}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View
                style={{
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderWidth: 1,
                  width: '55%',
                  backgroundColor: 'rgba(255,95,95,0.2)',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#808080',
                    textAlign: 'center',
                    paddingVertical: '5%',
                  }}>
                  {getValues('opt1')}
                </Text>
              </View>
              <View
                style={{
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderWidth: 1,
                  width: '55%',
                  backgroundColor: 'rgba(73,211,202,0.2)',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#808080',
                    textAlign: 'center',
                    paddingVertical: '5%',
                  }}>
                  {getValues('opt2')}
                </Text>
              </View>
            </View>
          </View>
          <Divider orientation="vertical" style={{marginVertical: '7%'}} />
        </View>

        {/* 등록 버튼 */}
        <View style={{alignItems: 'center', marginBottom: '3%'}}>
          <TouchableOpacity
            style={styles.checkButton}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>등록</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: '1%',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: '100%',
  },
  registArgu: {
    fontWeight: 'bold',
    marginBottom: '4%',
    fontSize: 18,
    color: '#000000',
  },
  warning: {
    color: 'red',
    marginBottom: '3%',
  },
  preview: {
    textAlign: 'center',
    marginVertical: '5%',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: '10%',
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
  focusHalfInput: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
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
  errorText: {
    color: '#FF5F5F',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: '1%',
    marginVertical: 2,
  },
  checkButton: {
    marginBottom: '5%',
    width: '100%',
    height: 40,
    color: 'white',
    backgroundColor: '#FF5F5F',
    borderRadius: 6,
    justifyContent: 'center',
    padding: '2.5%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  dropDownOpen: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#808080',
    width: '25%',
  },
  dropDownButton: {
    width: '25%',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#808080',
  },
});
