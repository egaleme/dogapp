import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList
} from 'react-native';

const logoImage = '../assets/images/bglogin2.png';
import theme from '../styles/theme';
import { getToken,  getVerifyToken } from '../utils/tokenStorage';

export default class Splash extends Component { 
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async  () => {
    const token = await getToken();
    const verifyToken =   await getVerifyToken();

    if (verifyToken !== null) {
     this.props.navigation.navigate('Verify');
     return;
    }

   if(token !== null) {
      this.props.navigation.navigate('Categories')
    }else {
      setTimeout(() => {
       this.props.navigation.navigate('Login')
      },1000)
    }
  }

  render() {
    return (
     
          <View style={styles.logoView}>
            <Image source={require(`${logoImage}`)} style={{height: 170, width: 170}}/>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: null,
    width: null
    
  },
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  },
  subHeading: {
      color: '#ffffff80',
      textAlign: 'center',
      fontSize: 25,
  }
});
