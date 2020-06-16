import React from 'react'

import {
    SafeAreaView,
    ScrollView,
    View,
    Image,
    Text,
}from 'react-native'
import styles from './styles'
import globalStyles from '../../constants/globalStyles'
import * as constants from '../../constants/constants'
import Images from '../../../images'

class MainLayout extends React.Component{
  static navigationOptions = {
    title: "Coctelpedia"
  };

  constructor(props)
  {
    super(props)
  }
  
  render(){
    return(
      <SafeAreaView style={globalStyles.container}>   
          <ScrollView>
            {/* Home image */}
              <View style={[globalStyles.card, {marginBottom:10}]}>
                <Image 
                  source={Images.defaultCoctel} 
                  style={styles.image}
                />
              </View>
              
              <View style={[globalStyles.card, {marginTop:10}]}>
                {/* Welcome title */}
                  <Text style={globalStyles.title}>
                      {constants.title}
                  </Text>
                  {/* Welcome message text */}
                  <Text style={globalStyles.centeredText}>
                      {constants.coctelText}
                  </Text>
              </View>              
          </ScrollView>          
      </SafeAreaView>
      
    )
  }
}

export default MainLayout;