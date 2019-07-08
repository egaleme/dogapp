import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';

export default class Dog extends Component {
  static navigationOptions = ({navigation}) =>{
      return {
        title: 'Dog',
        headerLeft: <HeaderLeft navigation={navigation}/>
      }
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <Text>Dog</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
