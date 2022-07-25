import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React , {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'

import { Formik } from 'formik'
import * as Yup from 'yup'

const PasswordChange = () => {
    const PasswordChangeSchema = Yup.object().shape({
        password : Yup.string()
            .min(6, 'Your password has to have  6 characters')
            .required(),
            
        newPassword : Yup.string()
            .min(6, 'Your password has to have at 6 characters')
            .required(),
            
            newPasswordValid : Yup.string()
            .min(6, 'password has to have at least 6 characters')
            .required(),
        
    })

    return (
        <View style={styles.wrapper}>
            <Formik
            initialValues={{password : '', newPassword : '', newPasswordValid : ''}}
            onSubmit={ (values) => console.log(values)}
            validationSchema={PasswordChangeSchema}
            validateOnMount={true}
            >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => 
            (
                <>
                    <Text style ={{fontSize : 20, fontWeight :'bold'}}>현재 비밀번호*</Text>
                    <View style={[
                        styles.inputField,
                            {
                                borderColor :
                                    values.password.length < 1 || values.password.length >=6
                                    ?'#ccc' 
                                    :'red'
                            },
                        ]}
                        >
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='현재 비밀번호'
                            autoFocus={true}
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value = {values.password}
                        />
                    </View>
                    <Text style={{color:'#FF5F5F', fontSize : 10}}>
                        {1 > values.password.length  || values.password.length >= 6 
                            ? ''
                            : '6자 이상 적어주세요' } 
                    </Text>

                    <Text style ={{fontSize : 20, fontWeight :'bold'}}>새로운 비밀번호*</Text>
                    <View style={[
                        styles.inputField, {
                            borderColor : 
                                1 > values.newPassword.length  || values.newPassword.length >= 6
                                ?'#ccc' 
                                :'red'
                            },
                        ]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='새 비밀번호 입력'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            value = {values.newPassword}
                        />
                    </View>
                    <Text style={{color:'#FF5F5F', fontSize : 10}}>
                        {1 > values.newPassword.length  || values.newPassword.length >= 6 
                            ? ''
                            : '6자 이상 적어주세요' } 
                    </Text>
                    
                    <Text style ={{fontSize : 20, fontWeight :'bold'}}>새 비밀번호 확인*</Text>
                    <View style={[
                        styles.inputField, {
                            borderColor : 
                                (1 > values.newPasswordValid.length  || values.newPasswordValid.length >= 6) && values.newPasswordValid === values.newPassword
                                ?'#ccc' 
                                :'red'
                            },
                        ]}>
                        <TextInput
                            placeholderTextColor='#444'
                            placeholder='새 비밀번호 확인'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            onChangeText={handleChange('newPasswordValid')}
                            onBlur={handleBlur('newPasswordValid')}
                            value = {values.newPasswordValid}
                        />
                    </View>
                    
                    <Text style={{color:'#FF5F5F', fontSize : 10}}>
                        {1 > values.newPasswordValid.length  || values.newPasswordValid.length >= 6 
                            ? values.newPasswordValid === values.newPassword 
                                ? ''
                                : '새로운 비밀번호랑 일치하지 않습니다'
                                
                            : '6자 이상 적어주세요' } 
                    </Text>
                    
                    <Pressable  
                    titleSize={20} 
                    style={styles.button(isValid)} 
                    onPress= { handleSubmit }
                    disabled={!isValid}>
                        <Text style = {styles.buttonText}>비밀번호 변경</Text>
                    </Pressable>


                </>
            )}
            </Formik>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper : {
        marginTop : 60,
    },
    inputField : {
        borderRadius:4,
        borderColor:'gray',
        backgroundColor:'#FAFAFA',
        marginBottom:10,
        borderWidth:1,
        minHeight:40
    },
    button : (isValid) => ({
        backgroundColor: isValid ? '#FF5F5F' : 'rgba(255,95,95,0.25)',
        alignItems : 'center',
        justifyContent : 'center',
        minHeight : 42,
        borderRadius : 10,
    }),
    buttonText : {
        fontWeight : '600',
        color : '#fff',
        fontSize : 20,
    },
    signupContainer : {
        flexDirection :'row',
        width : '100%',
        justifyContent : 'center',
        marginTop : 50,
    },
})

export default PasswordChange