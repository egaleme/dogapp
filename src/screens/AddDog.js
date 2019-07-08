import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  DatePickerAndroid,
  TextInput,
  Picker,
  Image,
  Keyboard
} from 'react-native';
import { compose, graphql } from 'react-apollo';


import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';
import { addDogToServer } from '../graphql/mutations'

class AddDog extends Component {
  static navigationOptions = ({navigation}) =>{
      return {
        title: 'Add Dog',
       
      }
  }
  state = {
    dateOfBirth: '',
    breed: '',
    gender: '',
    picture:'',
    name: '',
    nameError: false,
    breedError: false,
    pictureError: false,
    dateOfBirthError: false,
    genderError: false,
  }

  datePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        const date = `${day} - ${month+1} - ${year}`
        this.setState({dateOfBirth: date})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  submit = async () => {
    const {name,gender,dateOfBirth,breed} = this.state;
    try {
     const res = await this.props.addDogToServer({variables: {name,gender,dateOfBirth,breed}})
      if (res.errors ) {
        return this.setState({inputError: 'Please fill all fields'}, ()=>{
          Keyboard.dismiss();
        });

      }
      this.props.navigation.navigate('DogList');
      this.setState({name: ""});
      this.setState({breed: ""});
      this.setState({picture: ""});
      this.setState({dateOfBirth: ''})
      this.setState({nameError: false, breedError: false});
      Keyboard.dismiss();
    }catch(e) {
      this.setState({inputError: 'Please ensure all fields are filled'})
    }
  }

  render() {
    const { navigation } = this.props;
    const {nameError,breedError} = this.state
    return (
      <View style={styles.container}>
          <ScrollView>
            <View style={styles.form}>
            <TextInput
                ref = {(textInput) => this.name = textInput}
                style = {nameError ? styles.error : theme.inputField}
                underlineColorAndroid = "transparent"
                value = {this.state.name}
                onChangeText = {(name) => this.setState({name, nameError: false})}
                onSubmitEditing = {() => this.breed.focus()}
                editable = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "Name"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
               <TextInput
                ref = {(textInput) => this.breed = textInput}
                style = {breedError ? styles.error : theme.inputField}
                underlineColorAndroid = "transparent"
                value = {this.state.breed}
                onChangeText = {(breed) => this.setState({breed, breedError: false})}
                onSubmitEditing = {() => this.gender.focus()}
                
                editable = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "Breed"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <Picker
              selectedValue={this.state.gender}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
              <Picker.Item label="Select Gender" value="default" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              </Picker>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
               <TextInput placeholder="Date of Birth" value={this.state.dateOfBirth} editable={false}/>
               <TouchableOpacity activeOpacity={0.7} onPress={this.datePicker}>
                   <Image source={require('../assets/images/date.png')} style={{height: 30, width: 30, marginLeft: 20}}/>
              </TouchableOpacity>
              </View>
            <TouchableOpacity activeOpacity={0.7} style={theme.btn} onPress={this.submit}>
            <Text style={theme.btnText}>Add</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
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
    error: {
      height: 50,
      color: theme.PRIMARY_COLOR,
      margin: 8,
      borderWidth: 1,
      borderRadius: 1,
      borderColor: 'red',
    }
});

export default compose(graphql(addDogToServer, {name: 'addDogToServer'}),)(AddDog)