import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'


import React from 'react'
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import * as colors from '../constants/colors'
import styles from './styles'
import globalStyles from '../constants/globalStyles'

import Main from "../layout/main";
import CoctelpediaFragment from "../layout/coctelpediaFragment";
import GamesFragment from "../layout/gamesFragment";
import SettingsFragment from "../layout/settingsFragment";


const route=["Inicio", "CoctelpediaFragment", "GamesFragment", "SettingsFragment"]

const imageSize=25;

//Bottom navigation menu, with this four options
//Icons taken from react-native-vector-icons, more at:
//https://oblador.github.io/react-native-vector-icons/

const bottomTabNavigator = createBottomTabNavigator(
{
  Inicio:{
    screen: Main,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <IconM name="home" size={imageSize} color={tintColor} />
      )
    }
  },
  Cócteles:{
    screen: CoctelpediaFragment,
    navigationOptions:{
      tabBarIcon:({tintColor}) =>(
        <IconM name="view-list" size={imageSize} color={tintColor}/>
      )
    }
  },
  Juegos:{
    screen:GamesFragment,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <IconM name="gamepad" size={imageSize} color={tintColor}/>
      )
    }
  },
  Ajustes:{
    screen:SettingsFragment,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <IconM name="settings" size={imageSize} color={tintColor}/>
      )
    }
  },
},
{
  initialRouteName: route[0],
  defaultNavigationOptions: {
    tabBarOptions: {
      //Navigation styling
      activeTintColor: colors.primaryColor,
      inactiveTintColor: colors.textGray,
      inactiveBackgroundColor:colors.navMenuBackground,
      activeBackgroundColor:colors.navMenuBackground,
      style:styles.tabBar,
      labelStyle:styles.navBarText,
      tabStyle:styles.tab,//Does it change anything?
    }      
  },

}
);

export default createAppContainer(bottomTabNavigator);