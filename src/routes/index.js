import React from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Splash from '../screens/Splash';
import Categories from '../screens/Categories';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import DogList from '../screens/DogList';
import AddDog from '../screens/AddDog';
import Dog from '../screens/Dog';
import ArticleList from '../screens/ArticleList';
import AddArticle from '../screens/AddArticle';
import Article from '../screens/Article';
import Verify from '../screens/Verify';

import theme from  '../styles/theme';

const AuthStack =  createStackNavigator(
    {
        Login: { screen: Login },
        Signup: { screen: Signup}
    },
    {
        navigationOptions: {
            header: null
        }
    }
);

const CategoryStack =  createStackNavigator(
    {
        Categories: { screen: Categories},
        ArticleList: { screen: ArticleList },
        AddArticle: { screen: AddArticle},
        Article: { screen:    Article}
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: theme.PRIMARY_COLOR,
            },
            headerTitleStyle: {
                color: '#fff',
                marginLeft: 55
            },
            headerTint: '#fff'
        }
    }
);

const DogStack =  createStackNavigator(
    {
        DogList: { screen: DogList},
        AddDog: { screen: AddDog },
        Dog: { screen: Dog}
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: theme.PRIMARY_COLOR,
            },
            headerTitleStyle: {
                color: '#fff',
                marginLeft: 55
            },
            headerTint: '#fff'
        }
    }
);

const AppStack = createBottomTabNavigator(
    {
        Articles: { screen: CategoryStack},
        Dogs: { screen: DogStack} 
    },
    {
        tabBarOptions: {
            activeTintColor: theme.PRIMARY_COLOR,
            labelStyle: {
              fontSize: 15,
            },
            style: {
              backgroundColor: 'white',
              borderTopWidth: 0.5,
              borderColor: '#e5e5e5',
            },
        },
        navigationOptions: {
            tabBarIcon: <Icon name="watch" size={28}/>
        }
    }
);

export default createSwitchNavigator(
    {
    Splash: { screen: Splash },
    App: { screen: AppStack },
    Verify: { screen: Verify },
    Auth: { screen: AuthStack }
    },
    {
        initialRouteName: 'Splash'
    }
);