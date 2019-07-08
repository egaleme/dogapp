import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

import { graphql, compose } from 'react-apollo';

import theme from '../styles/theme';
import SingleArticle from '../components/SingleArticle';
import {addArticle, dropArticle} from '../graphql/mutations';


class Article extends Component {
    
  addArticle =()=> {
    const {item} = this.props
    this.props.addArticle(item)
  }
  render() {
    const { item, navigation } = this.props;
    return (
      <View style={styles.articleContainer}>
        <View style={styles.article}>
          <View style={styles.articleTextandImage}>
          <Image source={require('../assets/images/cat-img-1.jpeg')} style={{height: 60, width: 60,borderRadius: 65}} />
          <Text style={styles.text}>{item.title}</Text>
          </View>
          <TouchableOpacity activeOpactity={0.5} onPress={() => this.addArticle(item)}>
            <Image source={require('../assets/images/up.png')} style={{height:20, width:20}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

 class ArticleList extends Component {
  
  static navigationOptions = ({navigation}) =>{
      return {
        title: `Articles in ${navigation.getParam('articles')[0].category.toLowerCase()}`
      }
  }

  componentWillMount() {
    this.props.dropArticle()
  }
  

  addArticle = (article) => {
    this.props.addArticle({variables: {title: article.title, content: article.content, image: article.image, category: article.category}})
  }


  render() {
    const { navigation } = this.props;
    const articles = navigation.getParam('articles')
    return (
            <View style={styles.container}>
            <View style={{height: '40%'}}>
            <SingleArticle navigation={navigation}/>
            </View>
            <View style={{height: 55, backgroundColor: theme.PRIMARY_COLOR, flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20,}}>
              <Image source={require('../assets/images/delete.png')} style={{height:20,width:20}}/>
              <Image source={require('../assets/images/edit.png')} style={{height:20,width:20}}/>
              <Image source={require('../assets/images/redo.png')} style={{height:20,width:20}}/>
            </View>
             <FlatList style={{flex: 1}}
              data={articles} 
              renderItem={({item}) => <Article item={item} navigation={navigation} addArticle={this.addArticle}/>}
              keyExtractor ={(item) => item.id}
              ItemSeparatorComponent= {()=> <View style={{height:0.5, backgroundColor:theme.PRIMARY_COLOR}}/>}
             />
            </View>
     );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    articleContainer: {
      flex: 1,
    },
    text: {
      color: '#000',
      marginLeft: 10,
    },
    articleTextandImage: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    article: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 10,
      justifyContent: 'space-between',
    }
});

export default compose(
  graphql(addArticle, {name: 'addArticle'}),
  graphql(dropArticle, {name: 'dropArticle'}),)
(ArticleList)
