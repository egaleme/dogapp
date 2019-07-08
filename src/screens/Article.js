import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';


export default class Article extends Component {
    static navigationOptions = ({navigation}) =>{
        return {
          title: navigation.getParam('article').title 
        }
    }
  
  render() {
    const  item  = this.props.navigation.getParam('article');
    return (
      <View style={styles.articleContainer}>
        <Text numberOfLines={2} style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.content}</Text>
        <Text style={styles.text}>Written by {item.personByPersonId.firstName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    articleContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    text: {
      color: '#000',
    }
});
