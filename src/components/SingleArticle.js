import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { compose, graphql } from 'react-apollo';

import {getArticle} from '../graphql/query'


class SingleArticle extends Component  {
    goAddArticle(navigation, category) {
        navigation.navigate('AddArticle', {category: category})
    }
    render() {
        const {article, navigation} = this.props;
        
        if (article) {
            return (
                <View style={styles.container}>
                    <View style={{flexDirection: 'row',alignSelf: 'center',margin: 5}}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => this.goAddArticle(navigation,article.category)}>
                        <Image source={require('../assets/images/add.png')} style={{height:20,width:20}}/>
                        </TouchableOpacity>
                        <Text style={styles.text}>Add an article</Text>
                    </View>
                    <View style={styles.article}>
                    <Image source={require('../assets/images/cat-img-1.jpeg')} style={{height: 60, width: 60, borderRadius: 65}}/>
                    <View>
                    <Text numberOfLines={2} style={styles.text}>{article.title}</Text>
                    <Text style={styles.text}>{article.content}</Text>
                    </View>
                    </View>
                    
                </View>
              )
        }

}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    article: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        margin: 10
    },
    text: {
        color: '#000',
        marginLeft: 10,
    }
});

export default compose(
    graphql(getArticle, {
    props: ({data: {article}}) =>({
        article
    })
}),)(SingleArticle);
