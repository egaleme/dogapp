import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import  ApolloClient from 'apollo-boost';

import Login from './src/screens/Login';
import MainApp from './src/routes';
import { getToken } from './src/utils/tokenStorage';
import theme from './src/styles/theme';

import defaults from './src/graphql/defaults';
import resolvers from './src/graphql/resolvers';


const client = new ApolloClient({
  uri: "http://10.0.2.2:5000/graphql",
  clientState: {
    defaults,
    resolvers,
  },
  request: async (operation) => {
    const token = await getToken();
    if (token !==null) {
      operation.setContext({
        headers: {
          authorization: token !==null ? `Bearer ${token}` : null
        }
      });
    }
  }
})

export default class App extends Component {
  render() {
    return (
      
        <ApolloProvider client={client}>
          <StatusBar backgroundColor={theme.PRIMARY_COLOR} barStyle="light-content"/>
          <MainApp/>
        </ApolloProvider>
      
    );
  } 
} 