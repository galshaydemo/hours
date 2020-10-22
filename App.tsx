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
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import SQLite from "react-native-sqlite-storage";
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import Home from './Home'
import Report from './Report'
import Geolocation from '@react-native-community/geolocation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './Search'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigator from './navigate/DrawerNavigator';
const Drawer = createDrawerNavigator();

export default function App()
{
  
  useEffect(function() {
    
    Geolocation.getCurrentPosition(info => console.log(info))
  
   
}, []);
    return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
        <Drawer.Screen name="Report" component={Report}></Drawer.Screen>
        <Drawer.Screen name="Search" component={Search}></Drawer.Screen>
      </Drawer.Navigator>
       
    </NavigationContainer>  )
  }

  

