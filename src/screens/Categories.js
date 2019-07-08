import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { Query, compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Icon from 'react-native-vector-icons/MaterialIcons';
import lodash  from '../libs/lodash.min';
import { signOutVerify, getToken, signOut } from '../utils/tokenStorage';

import HeaderLeft from '../components/headerLeft';
import theme from '../styles/theme';

import { getArticlesFromServer } from '../graphql/query';
import {updateCategory} from '../graphql/mutations'


class Category extends Component {  
  render() {
    const { item, num , imgUrl} = this.props;
    return (
        <View style={{margin: 10, paddingHorizontal: 10,}}>
          <ImageBackground source={imgUrl} style={{width:'100%', height: 100}}>
            <Text style={{color:'#000', fontSize: 25, fontWeight: 'bold', marginLeft: 20, position: 'absolute', bottom: 0}}>{item}</Text>
          </ImageBackground>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginTop: 10, color: '#000'}}>{num} article(s) </Text>
            <Image source={require('../assets/images/right-2.png')} style={{width: 16, height: 16, marginTop: 10}}/>
          </View>
        </View>            
    );
  }
}

class Categories extends Component {

  static navigationOptions = ({navigation}) => {
    return {
       title: 'Articles',
       headerLeft: <HeaderLeft navigation={navigation}/>
    }
 }

 getArticles(articles){
  this.props.updateCategory({variables: {category: articles[0].category}})
  this.props.navigation.navigate('ArticleList', {articles});
 }

render() { 
  return (
    <Query query={getArticlesFromServer} pollInterval={1000}>
      { ({ loading, error, data }) => {
        if (loading) return <ActivityIndicator  />
        if (/Response/i.test(error)) return <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}><Text style={{color: 'black', textAlignment: 'center'}}>Error from server</Text></View>
        
        const article = lodash.groupBy(data.allArticles.nodes, 'category')
        const c = article.CARE ? article.CARE.length: 0;
        const p = article.PSYSCHOLOGY ? article.PSYSCHOLOGY.length : 0;
        const a = article.ADOPTION ? article.ADOPTION.length: 0;
        const h = article.HELP ? article.HELP.length: 0;
        return (
          <View style={styles.container}>
            <ScrollView>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.getArticles(article.CARE)}>
                <Category item='Care' num={`${c}`} imgUrl= {require('../assets/images/cat-img-1.jpeg')}/>
              </TouchableOpacity>
              <View style={{height:0.3, backgroundColor:theme.PRIMARY_COLOR}}/>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.getArticles(article.PSYSCHOLOGY)}>
                <Category item='Psyschology' num={`${p}`} imgUrl= {require('../assets/images/cat-img-2.jpeg')}/>
              </TouchableOpacity>
              <View style={{height:0.3, backgroundColor:theme.PRIMARY_COLOR}}/>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.getArticles(article.ADOPTION)}>
               <Category item='Adoption' num={`${a}`} imgUrl= {require('../assets/images/cat-img-3.jpeg')}/>
              </TouchableOpacity>
              <View style={{height:0.3, backgroundColor:theme.PRIMARY_COLOR}}/>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.getArticles(article.HELP)}>
                <Category item='Help' num={`${h}`} imgUrl= {require('../assets/images/cat-img-4.jpeg')}/>
              </TouchableOpacity>
            </ScrollView>
        </View>
        );
      }}
    </Query>
    );

  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


export default compose(graphql(updateCategory, {name: 'updateCategory'}),)(Categories)

