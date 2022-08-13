import React, { useState, useRef,useEffect} from "react";
import { Alert,ScrollView } from "react-native";
import { signUp } from "../lib/auth";
import styled from 'styled-components/native';
import { Image, Input, Button } from '../Components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 300px 20px;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;
const SignUpScreen = ({ navigation}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    //회원가입시에 이름을 안입력했을 경우, 이메일 형식에 맞지 않는 이메일을 입력했을 경우, 비밀번호 최소 수를 넘지 않을 경우, 일치하지 않을 경우
    useEffect(() => {
        let _errorMessage = '';
        if (!validateEmail(email)) {
            _errorMessage = '이메일을 입력해주세요';
        }

        else if (password.length < 8) {
            _errorMessage = '비밀번호는 최소 8자 이상이어야 합니다';
        }

        else if (password !== passwordConfirm) {
            _errorMessage = '비밀번호가 일치하지 않습니다';
        }

        else {
            _errorMessage = '';
        }
        setErrorMessage(_errorMessage);
    }, [email, password, passwordConfirm]);

    useEffect(() => {
        setDisabled(
            !(email && password && passwordConfirm && !errorMessage)
        );
    }, [email, password, passwordConfirm, errorMessage]);

    const signUpSubmit = async () => { // 회원가입 함수
        const { email, password } = form;
        const info = { email, password };
        try {
            const { user } = await signUp(info);
            console.log(user);
        } catch (e) {
            Alert.alert("회원가입에 실패하였습니다.");
        }
    }
    return (
        <ScrollView>
            <Container>
                <Input ref={emailRef} label="Email"
                    value={email}
                    onChangeText={text => setEmail(removeWhitespace(text))}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    placeholder="이메일"
                    returnKeyType="next"
                />

                <Input ref={passwordRef} label="Password"
                    value={password}
                    onChangeText={text => setPassword(removeWhitespace(text))}
                    onSubmitEditing={() => passwordConfirmRef.current.focus()}
                    placeholder="비밀번호"
                    returnKeyType="done"
                    isPassword
                />

                <Input ref={passwordConfirmRef} label="Password Confirm"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
                    onSubmitEditing={signUpSubmit}
                    placeholder="비밀번호 확인"
                    returnKeyType="done"
                    isPassword
                />

                <ErrorText>{errorMessage}</ErrorText>

                <Button title="Signup"
                    onPress={signUpSubmit}
                    disabled={disabled}
                />
            </Container>
        </ScrollView>
    )
}


export default SignUpScreen;