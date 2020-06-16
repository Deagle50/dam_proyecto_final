import React from 'react';
import Navigator from './src/navigation/'
import { View } from 'react-native';
 
export default class App extends React.Component {
  render() {
    return (
        <View style={{ flex: 1 }}>
          <Navigator/>                  
        </View>
    );
  }
}