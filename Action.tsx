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
import SQLite from "react-native-sqlite-storage";
import DatePicker from './DatePicker';
import PickerNumber from './Component/PickerNumber';
import TimePicker from './TimePicker';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
export default function ActionButton({close,auto,onClick,color,text})
{
		return(
         <TouchableOpacity onPress={()=>onClick(close,auto)}
          activeOpacity={0.5}>
          <Image style={{width:32,height:32,backgroundColor:color}}
            source={
              require('./clock.png')
            }
            
          />
          
          <Text>
             {text}
          </Text>

        </TouchableOpacity>
		)
}