import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard
} from 'react-native';

import {  graphql, compose } from 'react-apollo';

import { addArticleToServer } from '../graphql/mutations'
import { getCategory } from '../graphql/query';
import theme from '../styles/theme';


 class AddArticle extends Component {
  static navigationOptions = ({navigation}) =>{
      return {
        title: 'Add an Article',
      }
  }

  state = {
    title: '',
    content: '',
    image: '',
    titleError: false,
    contentError: false,
    imageError: false,
    inputError: ''
  }

  submit = async () => {
    const {title, content, image } = this.state;
    const {category} = this.props;
    if(title.length === 0) {
      return this.setState({titleError: true})
    }
    if(content.length === 0) {
      return this.setState({contentError: true})
    }

    try {
      const res = await this.props.addArticleToServer({variables: {title,content,image,category}})
      if (res.errors ) {
        return this.setState({inputError: 'Please fill all fields'}, ()=>{
          Keyboard.dismiss();
        });

      }
     this.props.navigation.navigate('Categories');
     this.setState({title: ""});
     this.setState({content: ""});
     this.setState({image: ""});
     this.setState({titleError: false, contentError: false});
     this.setState({inputError: ''});
     Keyboard.dismiss();
    } catch(e){
      this.setState({inputError: 'Please ensure all fields are filled'})
    }
  }

  render() {
    const { navigation } = this.props;
    const {titleError,contentError} = this.state;
    return (
      <View style={styles.container}>
           <ScrollView>
            <View style={styles.form}>
              <TextInput
                ref = {(textInput) => this.title = textInput}
                style = {titleError ? styles.error : theme.inputField}
                underlineColorAndroid = "transparent"
                value = {this.state.title}
                onChangeText = {(title) => this.setState({title, titleError: false})}
                onSubmitEditing = {() => this.content.focus()}
                editable = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "title"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <TextInput
                ref = {(textInput) => this.content = textInput}
                style = {contentError ? styles.error : styles.content}
                underlineColorAndroid = "transparent"
                value = {this.state.content}
                onChangeText = {(content) => this.setState({content, contentError: false})}
                onSubmitEditing = {() => this.image.focus()}
                editable = {true}
                maxLength = {120}
                multiline = {true}
                placeholder = "Content"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
              <TextInput
                ref = {(textInput) => this.image = textInput}
                style={ theme.inputField}
                underlineColorAndroid ="transparent"
                value = {this.state.image}
                onChangeText = {(image) => this.setState({image})}
                editable = {true}
                maxLength = {40}
                multiline = {false}
                placeholder = "Image uri"
                placeholderTextColor = {theme.PRIMARY_COLOR}
              />
            <View><Text style={{color: 'red', textAlign: 'center'}}>{this.state.inputError}</Text></View>
            <TouchableOpacity activeOpacity={0.7} style={theme.btn} onPress={this.submit}>
              <Text style={theme.btnText}>Submit</Text>
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
    content: {
      color: theme.PRIMARY_COLOR,
      margin: 8,
      borderWidth: 1,
      borderRadius: 1,
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


export default compose(
  graphql(getCategory, {
    props: ({data:{category}}) => ({
      category
    })
  }),
  graphql(addArticleToServer, {name: 'addArticleToServer'}),
)(AddArticle)
