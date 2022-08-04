import {View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Divider} from '@rneui/themed';
import React, {useState, useRef} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NoCheckInput from '../../components/signUp/NoCheckInput';
import InputLabel from '../../components/signUp/InputLabel';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import schema from '../../components/board/BoardValidation';
import CheckBox from '@react-native-community/checkbox';

export default function PlusScreen({navigation}) {
  const inputRef = useRef([]);
  const [titleStyle, setTitleStyle] = useState(styles.blurInput);
  const [argu1Style, setArgu1Style] = useState(styles.blurInput);
  const [argu2Style, setArgu2Style] = useState(styles.blurInput);
  const [toggleCheckBoxLove, setToggleCheckBoxLove] = useState(false)
  const [toggleCheckBoxFun, setToggleCheckBoxFun] = useState(false)
  const [toggleCheckBoxEtc, setToggleCheckBoxEtc] = useState(false)


  console.log({errors});
  const {
    handleSubmit,
    control,
    formState: {errors},
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      argu1: '',
      argu2: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{}}>
        {/* 논쟁등록/주의사항*/}
        <View style={{alignItems: 'center', marginTop: '5%'}}>
          <View>
            <Text style={styles.registArgu}>논쟁등록</Text>
          </View>
          <View>
            <Text style={styles.warning}>
              ※성별, 지역, 정치 논쟁은 그 내용과 관계없이 삭제됩니다.
            </Text>
          </View>
          <Divider orientation="vertical" />
        </View>

        {/* 논쟁, 1/2안 입력 */}
        <View style={{marginTop: '5%'}}>
          <InputLabel name="논쟁" star="*" />
          <NoCheckInput
            // placeholder='논쟁을 입력해주세요'
            control={control}
            style={titleStyle}
            setStyle={setTitleStyle}
            property="title"
            errorMessage={errors.title ? errors.title.message : ''}
            styles={styles}
            inputRef={inputRef}
            index={0}></NoCheckInput>
          <InputLabel name="1안" star="*" />
          <NoCheckInput
            control={control}
            style={argu1Style}
            setStyle={setArgu1Style}
            property="argu1"
            errorMessage={errors.argu1 ? errors.argu1.message : ''}
            styles={styles}
            inputRef={inputRef}
            index={1}></NoCheckInput>
          <InputLabel name="2안" star="*" />
          <NoCheckInput
            control={control}
            style={argu2Style}
            setStyle={setArgu2Style}
            property="argu2"
            errorMessage={errors.argu2 ? errors.argu2.message : ''}
            styles={styles}
            inputRef={inputRef}
            index={2}></NoCheckInput>
          {/* 카테고리 */}
          <View>
          <InputLabel name="카테고리(택1)" star="*" />
              <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row'}}>
                      <CheckBox
                          disabled={false}
                          value={toggleCheckBoxLove}
                          onValueChange={(newValue) => setToggleCheckBoxLove(newValue)}
                          />
                      <Text style={{paddingTop: '1.5%'}}>연애</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                      <CheckBox
                          disabled={false}
                          value={toggleCheckBoxFun}
                          onValueChange={(newValue) => setToggleCheckBoxFun(newValue)}
                          />
                      <Text style={{paddingTop: '1.5%'}}>병맛</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                      <CheckBox
                          disabled={false}
                          value={toggleCheckBoxEtc}
                          onValueChange={(newValue) => setToggleCheckBoxEtc(newValue)}
                          />
                      <Text style={{paddingTop: '1.5%'}}>기타</Text>
                  </View>
            </View>
        </View>
        </View>

        
        {/* 미리보기 -> 카드 제대로 만들면 다시해야함!!*/}
        <View style={{}}>
          <Divider orientation="vertical" style={{marginTop: '2.5%'}} />
          <Text style={styles.preview}> PREVIEW </Text>
          <View style={styles.card}>
            <View style={{marginBottom: '2.5%'}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', marginBottom: '5%'}}>{getValues('title')}</Text>
            </View>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <View style={{borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderWidth: 1, width: '55%' ,backgroundColor: 'rgba(255,90,110,0.3)', justifyContent: 'center'}}>
                <Text style={{color: 'white', textAlign: 'center', paddingVertical: '5%'}}>{getValues('argu1')}</Text>
              </View>
              <View style={{borderTopRightRadius: 5, borderBottomRightRadius: 5, borderWidth: 1, width: '55%' ,backgroundColor: 'rgba(131,227,209,0.3)', justifyContent: 'center'}}>
                <Text style={{color: 'white', textAlign: 'center', paddingVertical: '5%'}}>{getValues('argu2')}</Text>
              </View>
            </View>
          </View>
          <Divider orientation="vertical" style={{marginVertical: '7%'}} />
        </View>

        {/* 등록 버튼 */}
        <View style={{alignItems: 'center', marginBottom : '3%'}}>
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
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    height: '100%',
  },
  registArgu: {
    fontWeight: 'bold',
    marginBottom: '3%',
    fontSize: 18
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
    color: '#FF7171',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: '1%',
    marginVertical: 2,
  },
  checkButton: {
    marginBottom: '5%',
    width: '23%',
    color: 'white',
    backgroundColor: '#FF7171',
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
});
