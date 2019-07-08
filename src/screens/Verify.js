import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { signOutVerify, getVerifyToken } from '../utils/tokenStorage';
import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';

const mutation = gql`
mutation Verify($token:Int!){
  verify(input:{token: $token}){
    person{
      firstName
      lastName
    }
  }
}`

class Verify extends Component {

  state = {
    code: null,
    codeError: false,
    inputError: '',
    token: null
  }

  async componentDidMount() {
    const t = await getVerifyToken()
    const token = JSON.parse(t)
    this.setState({token})
  }
  
  submit = async () => {
    const {code, token} = this.state;
    if(!code) {
      return this.setState({codeError: true})
    }    
    
    try {
      const res = await this.props.mutate({variables: {token: this.state.code}});
      if (res.data.verify.person === null) {
        this.setState({code: null});
        return this.setState({inputError: 'Error with code'}, ()=>{
          Keyboard.dismiss();
        });
      }
     this.setState({code: null, codeError: false, inputError: ''}, async () => {
      Keyboard.dismiss();
      await signOutVerify();
      this.props.navigation.navigate('Login');
     });
    } catch(e){
      this.setState({inputError: 'Error with code'})
    }
  }

  render() {
    const { navigation } = this.props;
    const {codeError} = this.state;
    return (
      <View style={styles.container}>
        <Text style={{color: 'red', textAlign: 'center', fontSize: 30, marginTop: 60,}}>Verify Your Account</Text>
          <View style={styles.form}>
            <TextInput
              ref = {(textInput) => this._code = textInput}
              style={ codeError ? styles.error : theme.inputField }
              underlineColorAndroid ="transparent"
              value = {this.state.code}
              onChangeText = {(code) => this.setState({code, codeError:false, inputError: ''})}
              editable = {true}
              maxLength = {40}
              multiline = {false}
              keyboardType = "phone-pad"
              placeholder = "code"
              placeholderTextColor = {theme.PRIMARY_COLOR}
            />
            <View><Text style={{color: 'red', textAlign: 'center'}}>{this.state.inputError}</Text></View>
            <View><Text style={{color: 'red', textAlign: 'center'}}>{this.state.token}</Text></View>
            <TouchableOpacity activeOpacity={0.7} style={theme.btn} onPress={this.submit}>
              <Text style={theme.btnText}>Enter Code</Text>
            </TouchableOpacity>
          </View>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
      flex: 1,
      margin: 10,
      padding: 10,
      justifyContent: 'center',
    },
    bottomBar: {
      backgroundColor: 'white',
      height: 55,
      justifyContent: 'center',
    },
    bottomBarText: {
      textAlign: 'center',
      color: theme.PRIMARY_COLOR
    },
    error: {
      height: 50,
      color: theme.PRIMARY_COLOR,
      margin: 8,
      borderWidth: 1,
      borderRadius: 1,
      borderColor: 'red',
  }
  });

  export default graphql(mutation)(Verify)