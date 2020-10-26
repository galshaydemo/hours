/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  I18nManager,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import * as tr from './translations/translation';
import {Picker} from '@react-native-community/picker';
import SQLite from "react-native-sqlite-storage";
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import Home from './Home'
import Report from './Report'
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DesignTrip from './DesignTrip/DesignTrip'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const handleLocalizationChange = () => {
    tr.setI18nConfig();
    this.forceUpdate();
  };
export default function App()
{
  
  tr.setI18nConfig();
  useEffect(function() {
    
    Geolocation.getCurrentPosition(info => console.log(info))
    RNLocalize.addEventListener("change", handleLocalizationChange);
  
   
}, []);
    return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Search" component={DesignTrip}></Drawer.Screen>
        <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
        <Drawer.Screen name="Report" component={Report}></Drawer.Screen>
        
      </Drawer.Navigator>
       
    </NavigationContainer>  )
  }

  

