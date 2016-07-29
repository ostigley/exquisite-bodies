import React, { Component } from 'react';
import {
  Text,
  View,
  WebView
} from 'react-native';


export class Main extends Component {
  render() {
    return (
        <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
     
    );
  }
}

export const MainContainer = ""