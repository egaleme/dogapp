import { AsyncStorage } from 'react-native';

const Auth_Token = '@Auth_Token';
const Verify_Token = '@Verify_Token';
let token;
let verifyToken;

export const getToken = async () => {
    if(token) {
        return Promise.resolve(token);
    }
    token = await AsyncStorage.getItem(Auth_Token);
    return token;
}

export const signIn = (newToken) => {
    token = newToken;
    return AsyncStorage.setItem(Auth_Token, token);
}

export const signOut =  () => {
    token = undefined;
    return  AsyncStorage.removeItem(Auth_Token);
}

export const getVerifyToken = async () => {
    if(verifyToken) {
        return Promise.resolve(verifyToken);
    }
    verifyToken =  await AsyncStorage.getItem(Verify_Token);
    return verifyToken;
    
}

export const signInVerify = (newToken) => {
    verifyToken = newToken;
    return AsyncStorage.setItem(Verify_Token, verifyToken);
}

export const signOutVerify = async () => {
    return  await AsyncStorage.removeItem(Verify_Token);
}