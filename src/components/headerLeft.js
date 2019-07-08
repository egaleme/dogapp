import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
  
} from 'react-native';

import { signOut, signInVerify, signOutVerify } from '../utils/tokenStorage';


export default class HeaderLeft extends Component {
 logout = async () => {
    await signOut();
    await  signOutVerify();
    this.props.navigation.navigate('Login');
  }
  render() {
      const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.4} onPress={() => this.logout()}>
           <Text style={{color: 'white', textAlign:'center', marginLeft: 15, fontSize: 15, }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
