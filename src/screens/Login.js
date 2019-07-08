import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { signIn } from '../utils/tokenStorage';
import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';

const logoImage = '../assets/images/logo@400.png';
const mutation = gql`
mutation Login($email:String!, $password: String!) {
    login(input: {email: $email, password: $password}){
        jwtToken
    }
  }`

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    text: '',
    emailError: false,
    passwordError: false,
    inputError: ''
  }


  submit = async () => {
    const {email, password} = this.state;
    if(email.length === 0) {
      return this.setState({emailError: true})
    }
    if(password.length === 0) {
      return this.setState({passwordError: true})
    }
    try {
      const res = await this.props.mutate({variables: {email, password}});
      if (res.data.login.jwtToken === null) {
        this.setState({email: ""});
        this.setState({password: ""});
        
        return this.setState({inputError: 'Error with email/password'}, ()=>{
          Keyboard.dismiss();
        });

      }
     this.setState({email: "", password: "", emailError: false, passwordError: false, inputError: ''}, () => {
      Keyboard.dismiss();
      signIn(res.data.login.jwtToken);
      this.props.navigation.navigate('Categories');
     });
    } catch(e){
      this.setState({inputError: 'Error with email/password'})
    }
  }

  render() {
    const { navigation } = this.props;
    const {emailError, passwordError} = this.state;
    return (
      <View style={styles.container}>
          <View style={{height: 120, justifyContent:'center', alignItems: 'center',}}>
            <Image source={require(`${logoImage}`)} style={{height: 100, width: 100}}/>
          </View>
          <View style={styles.form}>
            <TextInput
              ref = {(textInput) => this._email = textInput}
              style={ emailError ? styles.error : theme.inputField }
              underlineColorAndroid ="transparent"
              value = {this.state.email}
              onChangeText = {(email) => this.setState({email:email, emailError:false, inputError: ''})}
              onSubmitEditing = {()=> this._password.focus()}
              editable = {true}
              maxLength = {40}
              multiline = {false}
              keyboardType = "email-address"
              placeholder = "Email"
              placeholderTextColor = {theme.PRIMARY_COLOR}
            />
            <TextInput
              ref = {(textInput) => this._password = textInput}
              style ={ passwordError ? styles.error : theme.inputField }
              underlineColorAndroid ="transparent"
              value = {this.state.password}
              onChangeText = {(password) => this.setState({password: password, passwordError: false, inputError: ''})}
              onSubmitEditing = {() => this.submit()}
              editable = {true}
              secureTextEntry = {true}
              maxLength = {40}
              multiline = {false}
              placeholder = "Password"
              placeholderTextColor = {theme.PRIMARY_COLOR}
            />
            <View><Text style={{color: 'red', textAlign: 'center'}}>{this.state.inputError}</Text></View>
            <TouchableOpacity activeOpacity={0.7} style={theme.btn} onPress={this.submit}>
              <Text style={theme.btnText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomBar}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.bottomBarText}>Don't have an account? Sign up </Text>
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

  export default graphql(mutation)(Login)