import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image
} from 'react-native';
import { Query, Mutation } from 'react-apollo';


import { getAllDogs } from '../graphql/query';
import { addDog } from '../graphql/mutations';
import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';

class Dog extends Component {

  render(){
    const {item } = this.props;
    return (
      <View style={styles.dogTextandImage}>
        <Image source={{uri: item.picture}} style={{height:35, width:35, borderRadius: 37}}/>
        <View>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </View>
    );
  }
}

export default class DogList extends Component {
  static navigationOptions = ({navigation}) =>{
      return {
        title: 'All My Dogs',
        headerLeft: <HeaderLeft navigation={navigation}/>
      }
  }
  goAddDog = () => {
    this.props.navigation.navigate('AddDog')
  }

  render() {
    const { navigation } = this.props;
    return (
      <Query query={getAllDogs} pollInterval={1000}>
        {({loading, error, data})=>{
          if(loading) return <ActivityIndicator  />
          if (/Response/i.test(error)) return <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}><Text style={{color: 'black', textAlignment: 'center'}}>Error from server</Text></View>
          return(
            <View style={styles.container}>
              <View style={{flexDirection: 'row',alignSelf: 'center',margin: 5}}>
                <TouchableOpacity activeOpacity={0.6} onPress={this.goAddDog}>
                  <Image source={require('../assets/images/add.png')} style={{height:20,width:20}}/>
                </TouchableOpacity>
                <Text style={styles.text}>Add a dog</Text>
              </View>
              <FlatList style={{flex: 1}}
                data={data.allDogs.nodes}
                renderItem={({item})=><Dog item={item} />}
                ItemSeparatorComponent= {()=> <View style={{height:0.3, backgroundColor:theme.PRIMARY_COLOR}}/>}
              />
            </View>
          )
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dogTextandImage: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: '#000',
      marginLeft: 10,
    },
});