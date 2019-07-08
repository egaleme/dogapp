import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { signInVerify } from '../utils/tokenStorage';
import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';

const mutation = gql`
mutation SignUp($firstname:String!, $lastname: String!, $email: String!, $password: String!){
  signup(input:{firstName: $firstname, lastName: $lastname, email: $email, password: $password}){
    emailtoken{
      token
      email
    }
  }
}
  `


class Signup extends Component {

  state = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    confirm_password: '',
    first_nameError: false,
    last_nameError: false,
    confirm_passwordError: false,
    emailError: false,
    passwordError: false,
    inputError: '',
    error: '',
  }

  submit = async () => {
    const {email, password, confirm_password, first_name, last_name} = this.state;
    if(first_name.length === 0) {
      return this.setState({first_nameError: true})
    }
    if(last_name.length === 0) {
      return this.setState({last_nameError: true})
    }
    if(email.length === 0) {
      return this.setState({emailError: true})
    }
    if(password.length === 0) {
      return this.setState({passwordError: true})
    }
    if(confirm_password.length === 0 || password !== confirm_password) {
      return this.setState({confirm_passwordError: true})
    }
    try {
      const res = await this.props.mutate({variables: {firstname: first_name, lastname: last_name, email, password}});
      if (res.errors ) {
        return this.setState({inputError: 'Please fill all fields'}, ()=>{
          Keyboard.dismiss();
        });

      }
     signInVerify(JSON.stringify(res.data.signup.emailtoken.token));
     this.props.navigation.navigate('Verify');
     this.setState({email: ""});
     this.setState({password: ""});
     this.setState({first_name: ""});
     this.setState({last_name: ""});
     this.setState({confirm_password: ""});
     this.setState({emailError: false, passwordError: false, first_nameError: false, last_nameError: flase, confirm_passwordError: false});
     this.setState({inputError: ''});
     Keyboard.dismiss();
    } catch(e){
      this.setState({inputError: 'Please ensure all fields are filled'})
    }
  }

  clearValidationErrors = () => {

  }

  render() {
    const { navigation } = this.props;
    const {emailError, passwordError, last_nameError, first_nameError, confirm_passwordError} = this.state;
    return (
      <View style={styles.container}>
          <View style={{height: 55}}></View>
            <ScrollView>
            <View style={styles.form}>
              <TextInput
                ref = {(textInput) => this._first_name = textInput}
                style = {first_nameError ? styles.error : theme.inputField}
                underlineColorAndroid = "transparent"
                value = {this.state.first_name}
                onChangeText = {(first_name) => this.setState({first_name, first_nameError: false})}
                onSubmitEditing = {() => this._last_name.focus()}
                onFocus = {() => this.clearValidationErrors()}
                editable = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "FirstName"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <TextInput
                ref = {(textInput) => this._last_name = textInput}
                style = {last_nameError ? styles.error : theme.inputField}
                underlineColorAndroid = "transparent"
                value = {this.state.last_name}
                onChangeText = {(last_name) => this.setState({last_name, last_nameError: false})}
                onSubmitEditing = {() => this._email.focus()}
                onFocus = {() => this.clearValidationErrors()}
                editable = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "LastName"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <TextInput
                ref = {(textInput) => this._email = textInput}
                style={emailError ? styles.error : theme.inputField}
                underlineColorAndroid ="transparent"
                value = {this.state.email}
                onChangeText = {(email) => this.setState({email, emailError: false})}
                onSubmitEditing = {()=> this._password.focus()}
                onFocus = {()=> this.clearValidationErrors()}
                editable = {true}
                maxLength = {40}
                multiline = {false}
                keyboardType = "email-address"
                placeholder = "Email"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <TextInput
                ref = {(textInput) => this._password = textInput}
                style ={confirm_passwordError ? styles.error : theme.inputField}
                underlineColorAndroid ="transparent"
                value = {this.state.password}
                onChangeText = {(password) => this.setState({password, passwordError: false})}
                onSubmitEditing = {() => this._confirm_password.focus()}
                editable = {true}
                secureTextEntry = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "Password"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <TextInput
                ref = {(textInput) => this._confirm_password = textInput}
                style ={theme.inputField}
                underlineColorAndroid ="transparent"
                value = {this.state.confirm_password}
                onChangeText = {(confirm_password) => this.setState({confirm_password, confirm_passwordError: false})}
                editable = {true}
                secureTextEntry = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "Confirm Password"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
            <View><Text style={{color: 'red', textAlign: 'center'}}>{this.state.inputError}</Text></View>
            <TouchableOpacity activeOpacity={0.7} style={theme.btn} onPress={this.submit}>
              <Text style={theme.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
          <View style={styles.bottomBar}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.bottomBarText}>Already have an account? Log in </Text>
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

  export default graphql(mutation)(Signup);  